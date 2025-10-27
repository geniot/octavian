package main

import (
	"archive/zip"
	"bytes"
	"encoding/json"
	"errors"
	"image"
	_ "image/png"
	"io"
	"math/rand/v2"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/oliamb/cutter"
)

func syncScoresCache(tuneId int) (err error) {
	var (
		tune          *Tune
		imgBoundaries []ImageBoundary
		croppedImgBbs []byte
		croppedImg    image.Image
		img           image.Image
	)
	if scoresMap[tuneId] != nil {
		if err = gormDB.
			Table("tunes").
			Where("id = ?", tuneId).
			Select("id", "last_updated_on").
			Find(&tune).Error; err != nil {
			return err
		}
	}
	if scoresMap[tuneId] == nil || scoresMap[tuneId].LastUpdatedOn != *tune.LastUpdatedOn {
		// retrieving the tune's png
		if err = gormDB.
			Table("tunes").
			Where("id = ?", tuneId).
			Select("id", "png", "last_updated_on").
			Find(&tune).Error; err != nil {
			return err
		}
		//SPLITTING
		if img, _, err = image.Decode(bytes.NewReader(tune.Png)); err != nil {
			return err
		}
		imgBoundaries = extractBoundaries(SCORE_WIDTH_SPLIT, img.Bounds().Dx())
		scoresMap[tuneId] = &PngScore{Id: *tune.Id, Png: make(map[int][]byte), LastUpdatedOn: *tune.LastUpdatedOn}

		for index := range imgBoundaries {
			if croppedImg, err = cutter.Crop(img, cutter.Config{
				Width:  imgBoundaries[index].to - imgBoundaries[index].from,
				Height: img.Bounds().Dy(),
				Anchor: image.Point{X: imgBoundaries[index].from},
			}); err != nil {
				return err
			}
			if croppedImgBbs, err = img2bytes(croppedImg); err != nil {
				return err
			}
			scoresMap[tuneId].Png[index] = croppedImgBbs
		}
	}
	return nil
}

func loadScore(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		jwtToken     = c.QueryParam("jwt")
		part         = first(strconv.Atoi(c.QueryParam("part")))
		userId       int
		err          error
		responseCode = http.StatusOK
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = checkOwnership(userId, tuneId); err != nil {
		goto END
	}
	if err = syncScoresCache(tuneId); err != nil {
		goto END
	}
	if part < 0 || part >= len(scoresMap[tuneId].Png) {
		err = errors.New("Part outside image boundaries: " + strconv.Itoa(part) + "; length: " + strconv.Itoa(len(scoresMap[tuneId].Png)))
		responseCode = http.StatusNotFound
		goto END
	}
END:
	if err != nil {
		println("Couldn't load score by id: {}", tuneId)
		return c.Blob(responseCode, "image/png", nil)
	} else {
		return c.Blob(responseCode, "image/png", scoresMap[tuneId].Png[part])
	}
}

func getScoreMeta(c echo.Context) error {
	var (
		tuneId         = first(strconv.Atoi(c.Param("tuneId")))
		scoreMetaModel = ScoreMetaModel{}
		jwtToken       = c.Request().Header.Get(X_JWT)
		userId         int
		err            error
		responseCode   = http.StatusOK
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = c.Bind(&scoreMetaModel); err != nil {
		goto END
	}
	if err = checkOwnership(userId, tuneId); err != nil {
		goto END
	}
	if err = syncScoresCache(tuneId); err != nil {
		goto END
	}

	scoreMetaModel.TuneId = tuneId
	scoreMetaModel.Parts = len(scoresMap[tuneId].Png)

END:
	if err != nil {
		scoreMetaModel.HasError = true
		errText := err.Error()
		scoreMetaModel.Message = &errText
	}
	return c.JSON(responseCode, scoreMetaModel)
}

func extractBoundaries(split int, width int) []ImageBoundary {
	var (
		current       = 0
		imgBoundaries []ImageBoundary
	)
	for current < width {
		if current+split > width {
			imgBoundaries = append(imgBoundaries, ImageBoundary{from: current, to: width})
		} else {
			imgBoundaries = append(imgBoundaries, ImageBoundary{from: current, to: current + split})
		}
		current = current + split
	}
	return imgBoundaries
}

func loadTune(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		dbTune       = Tune{}
		playerTune   = Tune{}
		tuneModel    = TuneModel{}
		jwtToken     = c.Request().Header.Get(X_JWT)
		userId       int
		responseCode = http.StatusOK
		err          error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = checkOwnership(userId, tuneId); err != nil {
		goto END
	}
	if err = gormDB.
		Table("tunes").
		Where("id = ?", tuneId).
		Select("id", "owner_id", "title", "author", "instrument", "json", "png_width", "png_height", "selection_ranges").
		Find(&dbTune).Error; err != nil {
		goto END
	}
	if err = json.Unmarshal([]byte(*dbTune.Json), &playerTune); err != nil {
		goto END
	}
	copyTuneAttributes(&playerTune, &dbTune)
	tuneModel.Tune = &dbTune
END:
	return c.JSON(responseCode, tuneModel)
}

func checkOwnership(userId int, tuneId int) error {
	var (
		catalogueTune *Tune
	)
	if allTunesMap[tuneId] != nil {
		catalogueTune = allTunesMap[tuneId]
	} else {
		return errors.New("the requested tune is not found")
	}
	//ownership check
	if catalogueTune.OwnerId != adminId && catalogueTune.OwnerId != userId {
		return errors.New("you can only access your own or catalogue tunes")

	}
	return nil
}

func copyTuneAttributes(from *Tune, to *Tune) {
	to.BarOffsets = from.BarOffsets
	to.Points = from.Points
	to.SheetWidth = from.SheetWidth
	to.SheetHeight = from.SheetHeight
	to.PlayHeadWidth = from.PlayHeadWidth
	to.Json = nil
}

func getAudio(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		tune         *Tune
		responseCode = http.StatusInternalServerError
		err          error
	)
	if err = gormDB.Table("tunes").
		Where("id = ?", tuneId).
		Select("mp3").
		Find(&tune).Error; err != nil {
		goto END
	}

END:
	if err != nil {
		println("Couldn't prepare tune mp3 for id: {}", tuneId)
		return c.JSON(responseCode, err.Error())
	} else {
		return c.Blob(http.StatusOK, "audio/mp3", tune.Mp3)
	}
}

func downloadTune(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		userId       int
		tune         *Tune
		jwtToken     = c.QueryParam("jwt")
		buf          = new(bytes.Buffer)
		zipWriter    = zip.NewWriter(buf)
		zipFile      io.Writer
		fileName     = strconv.Itoa(rand.Int())
		responseCode = http.StatusInternalServerError
		err          error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = checkOwnership(userId, tuneId); err != nil {
		goto END
	}

	if err = gormDB.Table("tunes").
		Where("id = ?", tuneId).
		Select("id", "owner_id", "instrument", "mscx", "json").
		Find(&tune).Error; err != nil {
		goto END
	}
	fileName = strconv.Itoa(tune.OwnerId) + "_" + strconv.Itoa(*tune.Id)
	if zipFile, err = zipWriter.Create(fileName + ".mscx"); err != nil {
		goto END
	}
	if _, err = zipFile.Write([]byte(*tune.Mscx)); err != nil {
		goto END
	}
	if zipFile, err = zipWriter.Create(fileName + ".json"); err != nil {
		goto END
	}
	if _, err = zipFile.Write([]byte(*tune.Json)); err != nil {
		goto END
	}
	if err = zipWriter.Close(); err != nil {
		goto END
	}
END:
	if err != nil {
		println("Couldn't prepare tune download for id: {}", tuneId)
		return c.JSON(responseCode, err.Error())
	} else {
		c.Response().Header().Set("Content-Disposition", "attachment; filename="+fileName+".zip")
		return c.Blob(http.StatusOK, "application/octet-stream", buf.Bytes())
	}
}
