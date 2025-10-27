package main

import (
	"encoding/json"
	"errors"
	"math"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func saveFingering(c echo.Context) error {
	var (
		tuneId        = first(strconv.Atoi(c.Param("tuneId")))
		tuneModel     = TuneModel{}
		catalogueTune *Tune
		dbTune        = Tune{}
		playerTune    = Tune{}
		jwtToken      = c.Request().Header.Get(X_JWT)
		userId        int
		jsonStrBbs    []byte
		jsonStr       string
		responseCode  = http.StatusOK
		err           error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if allTunesMap[tuneId] != nil {
		catalogueTune = allTunesMap[tuneId]
	} else {
		err = errors.New("the requested tune is not found")
		goto END
	}
	if userId != adminId && catalogueTune.OwnerId != userId {
		err = errors.New("you cannot change this tune")
		goto END
	}
	if err = c.Bind(&tuneModel); err != nil {
		goto END
	}
	if err = gormDB.
		Table("tunes").
		Where("id = ?", tuneId).
		Select("id", "json").
		Find(&dbTune).Error; err != nil {
		goto END
	}
	if err = json.Unmarshal([]byte(*dbTune.Json), &playerTune); err != nil {
		goto END
	}
	if err = setFingers(tuneModel.Tune.Points, playerTune.Points); err != nil {
		goto END
	}
	if jsonStrBbs, err = json.MarshalIndent(playerTune, "", "\t"); err != nil {
		goto END
	}
	jsonStr = string(jsonStrBbs)
	if err = gormDB.
		Table("tunes").
		Select("json", "selection_ranges").
		Where("id = ?", tuneId).
		Updates(Tune{Json: &jsonStr, SelectionRanges: tuneModel.Tune.SelectionRanges}).
		Error; err != nil {
		goto END
	}
	tuneModel.Tune = &dbTune
END:
	return c.JSON(responseCode, tuneModel)
}

// simple optimistic merging: if lengths are not equal, use the minimum length
func setFingers(fromPoints []*Point, toPoints []*Point) error {
	var err error
	var minLength = math.Min(float64(len(fromPoints)), float64(len(toPoints)))
	for i := 0; i < int(minLength); i++ {
		var fromPoint = fromPoints[i]
		var toPoint = toPoints[i]
		var minNotesOnLength = math.Min(float64(len(fromPoint.NotesOn)), float64(len(toPoint.NotesOn)))
		for k := 0; k < int(minNotesOnLength); k++ {
			var fromNote = fromPoint.NotesOn[k]
			var toNote = toPoint.NotesOn[k]
			toNote.Fingers = fromNote.Fingers
		}
	}
	return err
}
