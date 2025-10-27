package main

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
)

func loadCatalogue(c echo.Context) error {
	var (
		instrument     = c.Param("instrument")
		level          = first(strconv.Atoi(c.Param("level")))
		jwtToken       = c.Request().Header.Get(X_JWT)
		userId         int
		filteredTunes  = make(map[int]*CatalogueTuneDTO)
		catalogueModel = CatalogueModel{}
		responseCode   = http.StatusOK
		err            error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = syncCatalogue(); err != nil {
		println(err.Error())
	}
	for _, tune := range allTunesMap {
		if strings.HasSuffix(instrument, *tune.Instrument) {
			var catalogueTune = &CatalogueTuneDTO{}
			if err = copier.Copy(catalogueTune, tune); err != nil {
				println(err.Error())
			}
			if level == 0 {
				if tune.OwnerId == userId && tune.LevelNum == level {
					filteredTunes[catalogueTune.Id] = catalogueTune
				}
			} else {
				if tune.OwnerId == adminId && tune.LevelNum == level {
					filteredTunes[catalogueTune.Id] = catalogueTune
				}
			}
		}
	}
	if level != 0 {
		if err = setBestScores(&filteredTunes, userId); err != nil {
			goto END
		}
	}
	catalogueModel.RequestedTunes = &filteredTunes

END:
	if err != nil {
		catalogueModel.HasError = true
		errText := err.Error()
		catalogueModel.Message = &errText
	}
	return c.JSON(responseCode, catalogueModel)
}

func getNextAvailableTunePosition(userId int) int {
	var highestPosition = 0
	for _, tune := range allTunesMap {
		if tune.OwnerId == userId && tune.PositionNum > highestPosition {
			highestPosition = tune.PositionNum
		}
	}
	return highestPosition + 1
}

func syncCatalogue() (err error) {
	var (
		allTunes []*Tune
	)
	if err = gormDB.
		Debug().
		Select("id", "owner_id", "last_updated_on", "owner_id", "title", "author", "instrument", "cover", "level_num", "position_num").
		Table("tunes").
		Where("last_updated_on >= ?", lastUpdatedOn).
		Find(&allTunes).Error; err != nil {
		return err
	}
	for _, tune := range allTunes {
		allTunesMap[*tune.Id] = tune
		if *tune.LastUpdatedOn > lastUpdatedOn {
			lastUpdatedOn = *tune.LastUpdatedOn
		}
	}
	return nil
}
