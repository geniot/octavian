package main

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/labstack/echo/v4"

	"net/http"
	"sort"
	"strconv"
	"strings"
	"time"
)

/**
 * Sets bestScore to tunes in the catalogue to display stars and unlocked tunes.
 */
func setBestScores(tunes *map[int]*CatalogueTuneDTO, userId int) error {
	var (
		stats    []*Stats
		statsMap = make(map[int64]*Stats)
		err      error
	)
	if err = gormDB.
		Debug().
		Select("tune_id", "best_score", "credits").
		Table("stats").
		Where("user_id = ?", userId).
		Where("tune_id in (?)", extractIds(tunes)).
		Find(&stats).Error; err != nil {
		return err
	}
	for _, statsRow := range stats {
		statsMap[statsRow.TuneId] = statsRow
	}
	for id, tune := range *tunes {
		if statsMap[int64(id)] != nil {
			tune.BestScore = statsMap[int64(tune.Id)].BestScore
			tune.Credits = statsMap[int64(tune.Id)].Credits
		} else {
			tune.BestScore = 0
			tune.Credits = 0
		}
	}
	return err
}

func getStats(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		jwtToken     = c.Request().Header.Get(X_JWT)
		userId       int
		dbStats      *Stats
		tuneStats    = make([]*StatsRecord, 0)
		statsModel   = StatsModel{}
		responseCode = http.StatusOK
		err          error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = gormDB.Table("stats").
		Where("tune_id = ?", tuneId).
		Where("user_id = ?", userId).
		Select("performances").
		First(&dbStats).Error; err != nil {
		responseCode = http.StatusNotFound
		goto END
	}
	if dbStats.Performances == nil {
		responseCode = http.StatusNotFound
		goto END
	}
	if err = json.Unmarshal([]byte(*dbStats.Performances), &tuneStats); err != nil {
		goto END
	}
	sort.Slice(tuneStats, func(i, j int) bool {
		return strings.Compare(*tuneStats[i].Date, *tuneStats[j].Date) > 0
	})
	statsModel.RequestedStats = tuneStats
END:
	if err != nil {
		statsModel.HasError = true
		errText := err.Error()
		statsModel.Message = &errText
	}
	return c.JSON(responseCode, statsModel)
}

func deleteStats(c echo.Context) error {
	var (
		tuneId       = first(strconv.Atoi(c.Param("tuneId")))
		jwtToken     = c.Request().Header.Get(X_JWT)
		userId       int
		tuneStats    = make([]*StatsRecord, 0)
		statsModel   = StatsModel{}
		responseCode = http.StatusOK
		err          error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = gormDB.
		Table("stats").
		Where("tune_id = ?", tuneId).
		Where("user_id = ?", userId).
		Select("performances", "best_score").
		Updates(Stats{Performances: nil, BestScore: 0}).
		Error; err != nil {
		goto END
	}
	statsModel.RequestedStats = tuneStats
END:
	if err != nil {
		statsModel.HasError = true
		errText := err.Error()
		statsModel.Message = &errText
	}
	return c.JSON(responseCode, statsModel)
}

/**
 * Updates user tune stats with a new performance. Performances are stored as a json array in a text field.
 */
func postStats(c echo.Context) error {
	var (
		tuneId          = first(strconv.Atoi(c.Param("tuneId")))
		statsModel      = StatsModel{}
		jwtToken        = c.Request().Header.Get(X_JWT)
		userId          int
		dbStats         *Stats
		statScore       = 0
		bestScore       = 0
		performances    []byte
		performancesStr string
		currentDateTime string
		tuneStats       = make([]*StatsRecord, 0)
		responseCode    = http.StatusOK
		err             error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}
	if err = c.Bind(&statsModel); err != nil {
		goto END
	}
	if err = gormDB.
		Debug().
		Table("stats").
		Where("tune_id = ?", tuneId).
		Where("user_id = ?", userId).
		Select("performances").
		First(&dbStats).Error; err != nil {
		err = errors.New("No stats record for update is found, tune must be first unlocked.")
		goto END
	}
	if dbStats.Performances != nil {
		if err = json.Unmarshal([]byte(*dbStats.Performances), &tuneStats); err != nil {
			goto END
		}
	}
	currentDateTime = getCurrentDateTime()
	statsModel.SubmittedStats.Date = &currentDateTime
	tuneStats = append(tuneStats, statsModel.SubmittedStats)
	sort.Slice(tuneStats, func(i, j int) bool {
		return strings.Compare(*tuneStats[i].Date, *tuneStats[j].Date) > 0
	})
	for _, stat := range tuneStats {
		statScore = getScore(stat)
		if statScore > bestScore {
			bestScore = statScore
		}
	}
	if performances, err = json.MarshalIndent(&tuneStats, "", "\t"); err != nil {
		goto END
	}
	performancesStr = string(performances)
	//update actually
	if err = gormDB.
		Table("stats").
		Where("tune_id = ?", tuneId).
		Where("user_id = ?", userId).
		Select("performances", "best_score").
		Updates(Stats{Performances: &performancesStr, BestScore: bestScore}).
		Error; err != nil {
		goto END
	}

END:
	if err != nil {
		statsModel.HasError = true
		errText := err.Error()
		statsModel.Message = &errText
	}
	//returning the same stats model unchanged as a confirmation that it was saved
	return c.JSON(responseCode, statsModel)
}

// return datetime in the format 2023-01-15T11:03:52.327134031 (Java legacy LocalDateTime)
func getCurrentDateTime() string {
	currentTime := time.Now()
	return fmt.Sprintf("%04d-%02d-%02dT%02d:%02d:%02d", currentTime.Year(), currentTime.Month(), currentTime.Day(), currentTime.Hour(), currentTime.Minute(), currentTime.Second())
}

func getScore(stat *StatsRecord) int {
	var ratio = 100
	var total = len(*stat.Rh)*ratio + len(*stat.Lh)*ratio
	var handScore = getHandScore(stat.Rh, float64(ratio))
	handScore += getHandScore(stat.Lh, float64(ratio))
	return int((handScore * 100) / float64(total))
}

func getHandScore(hand *string, ratio float64) float64 {
	var handScore = float64(0)
	for _, character := range *hand {
		if character == '1' {
			handScore += ratio / 1.5
		}
		if character == '2' {
			handScore -= ratio / 2
		}
		if character == '0' {
			handScore += ratio
		}
	}
	if handScore > 0 {
		return handScore
	} else {
		return 0
	}
}

func extractIds(tunes *map[int]*CatalogueTuneDTO) []int {
	keys := make([]int, 0, len(*tunes))
	for k := range *tunes {
		keys = append(keys, k)
	}
	return keys
}
