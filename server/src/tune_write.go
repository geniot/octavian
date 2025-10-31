package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"io"
	"mime/multipart"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

func deleteTune(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		tuneModel    = TuneModel{}
		jwtToken     = c.Request().Header.Get(X_JWT)
		userId       int
		responseCode = http.StatusOK
		err          error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if allTunesMap[tuneId] == nil {
		err = errors.New("couldn't find any tune by id")
		goto END
	}
	if allTunesMap[tuneId].LevelNum > 0 {
		err = errors.New("currently only zero-level tunes can be deleted")
		goto END
	}
	if userId != adminId && allTunesMap[tuneId].OwnerId != userId {
		err = errors.New("you can only delete your own tunes")
		goto END
	}
	//delete actually, ADMIN can delete any zero-level tunes, USERS can delete only their own zero-level tunes
	if err = gormDB.
		Table("tunes").
		Where("id = ?", tuneId).
		Delete(&Tune{}).
		Error; err != nil {
		goto END
	}
	delete(allTunesMap, tuneId)
END:
	return c.JSON(responseCode, tuneModel)
}

func saveTune(c echo.Context) error {
	var (
		tuneModel              = TuneModel{}
		tune                   = Tune{}
		dbTune                 = Tune{}
		playerTune             = Tune{}
		tuneStr                = c.FormValue("tune")
		jsonStrBbs             []byte
		coverBytes             *[]byte
		museBytes              *[]byte
		museString             string
		coverString            string
		tuneJsonStr            string
		tuneJsonBytes          []byte
		uploadForm             *multipart.Form
		museConversionResponse *MuseConversionResponse
		jwtToken               = c.Request().Header.Get(X_JWT)
		userId                 int
		responseCode           = http.StatusOK
		err                    error
	)
	//USER VALIDATION
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if uploadForm, err = c.MultipartForm(); err != nil {
		goto END
	}
	//TUNE
	if err = json.Unmarshal([]byte(tuneStr), &tune); err != nil {
		goto END
	}
	tune.OwnerId = userId
	//COVER
	coverBytes = readFormFile(uploadForm, "cover")
	if coverBytes != nil {
		coverString = "data:image/png;base64," + base64.StdEncoding.EncodeToString(*coverBytes)
		tune.Cover = &coverString
	} else {
		tune.Cover = &DEFAULT_COVER
	}
	//MUSE SCORE CONVERSION
	museBytes = readFormFile(uploadForm, "muse")
	if museBytes != nil {
		museString = string(*museBytes)
		if museConversionResponse, err = convertTune(&museString, tune.Title, tune.Author, tune.Instrument); err != nil {
			goto END
		}
		if museConversionResponse.Mp3 == nil || museConversionResponse.Tune == nil || museConversionResponse.PngSheet == nil {
			err = errors.New("couldn't convert the tune")
			goto END
		}
		if tuneJsonBytes, err = json.Marshal(museConversionResponse.Tune); err != nil {
			goto END
		}
		tuneJsonStr = string(tuneJsonBytes)
		//when mscx file is uploaded 4 fields are updated:
		tune.Mscx = &museString
		tune.Png = *museConversionResponse.PngSheet
		tune.PngWidth = (*museConversionResponse).PngWidth
		tune.PngHeight = (*museConversionResponse).PngHeight
		tune.Mp3 = *museConversionResponse.Mp3
		tune.Json = &tuneJsonStr
	}
	if userId != adminId {
		tune.LevelNum = 0
		tune.PositionNum = getNextAvailableTunePosition(userId)
	}
	//PERSISTENCE
	//CREATE
	if tune.Id == nil {
		tune.LastUpdatedOn = ptr(time.Now().Unix())
		if err = gormDB.
			Table("tunes").
			Create(&tune).
			Error; err != nil {
			goto END
		}
	} else {
		//UPDATE
		//VALIDATION
		if allTunesMap[*tune.Id] == nil {
			err = errors.New("couldn't find any tune by id")
			goto END
		}
		if allTunesMap[*tune.Id].OwnerId != adminId && allTunesMap[*tune.Id].OwnerId != userId {
			err = errors.New("you can only save your own tunes")
			goto END
		}
		//FORM FIELDS
		if err = gormDB.
			Debug().
			Table("tunes").
			Where("id = ?", tune.Id).
			Select("title", "author", "instrument").
			Updates(Tune{Title: tune.Title, Author: tune.Author, Instrument: tune.Instrument}).
			Error; err != nil {
			goto END
		}
		//COVER
		if coverBytes != nil {
			if err = gormDB.
				Table("tunes").
				Where("id = ?", tune.Id).
				Select("cover").
				Updates(Tune{Cover: &coverString}).
				Error; err != nil {
				goto END
			}
			tune.Cover = &coverString
		}
		//MUSESCORE
		if museBytes != nil {
			//try to merge existing fingering
			if err = gormDB.
				Table("tunes").
				Where("id = ?", tune.Id).
				Select("id", "json").
				Find(&dbTune).Error; err != nil {
				goto END
			}
			if err = json.Unmarshal([]byte(*dbTune.Json), &playerTune); err != nil {
				goto END
			}
			if err = setFingers(playerTune.Points, museConversionResponse.Tune.Points); err != nil {
				goto END
			}
			if jsonStrBbs, err = json.MarshalIndent(museConversionResponse.Tune, "", "\t"); err != nil {
				goto END
			}
			tuneJsonStr = string(jsonStrBbs)

			if err = gormDB.
				Table("tunes").
				Where("id = ?", tune.Id).
				Select("mscx", "png", "mp3", "json", "png_width", "png_height").
				Updates(Tune{
					Mscx:      &museString,
					Png:       *museConversionResponse.PngSheet,
					Mp3:       *museConversionResponse.Mp3,
					Json:      &tuneJsonStr,
					PngWidth:  museConversionResponse.PngWidth,
					PngHeight: museConversionResponse.PngHeight,
				}).
				Error; err != nil {
				goto END
			}
		}
	}
	tune.Png = nil
	tune.Mp3 = nil
	tune.Mscx = nil
	tune.Json = nil
	tuneModel.Tune = &tune
END:
	if err != nil {
		tuneModel.HasError = true
		errText := err.Error()
		tuneModel.Message = &errText
	}
	return c.JSON(responseCode, tuneModel)
}

func convertTune(museString *string, title *string, author *string, instrument *string) (*MuseConversionResponse, error) {
	var (
		museConversionResponse     = MuseConversionResponse{}
		museConversionRequest      = MuseConversionRequest{}
		conversionRequest          *http.Request
		conversionResponse         *http.Response
		client                     = &http.Client{}
		museConversionRequestBytes []byte
		body                       []byte
		err                        error
	)
	museConversionRequest.MuseXml = museString
	museConversionRequest.Title = title
	museConversionRequest.Author = author
	museConversionRequest.Instrument = instrument
	museConversionRequest.PngHeight = 300
	if museConversionRequestBytes, err = json.Marshal(museConversionRequest); err != nil {
		return nil, err
	}
	if conversionRequest, err = http.NewRequest(
		"POST",
		Conf.ConvertUrl,
		bytes.NewBuffer(museConversionRequestBytes)); err != nil {
		return nil, err
	}
	conversionRequest.Header.Set("Content-Type", "application/json")
	if conversionResponse, err = client.Do(conversionRequest); err != nil {
		return nil, err
	}
	defer closeBody(conversionResponse.Body)
	if body, err = io.ReadAll(conversionResponse.Body); err != nil {
		return nil, err
	}
	if err = json.Unmarshal(body, &museConversionResponse); err != nil {
		return nil, err
	}
	return &museConversionResponse, err
}
