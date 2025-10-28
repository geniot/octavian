package main

import (
	"bytes"
	"crypto/rand"
	"database/sql"
	"embed"
	"errors"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database"
	migratepg "github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoMw "github.com/labstack/echo/v4/middleware"
	"github.com/sirupsen/logrus"
	"github.com/xo/dburl"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	//go:embed migrations/*.sql
	migrationsFS embed.FS
	//go:embed ui/*
	ui embed.FS
	//go:embed res/octavian_console_banner.txt
	consoleBannerFS embed.FS
)

func main() {
	var (
		sqlDB             *sql.DB
		driver            database.Driver
		sourceDriver      source.Driver
		migrator          *migrate.Migrate
		dbName            = ExtractDbName(first(dburl.Parse(Conf.DatabaseUrl)).DSN)
		consoleBanner     = GetFileStringFS("res/octavian_console_banner.txt", &consoleBannerFS) //https://manytools.org/hacker-tools/ascii-banner/
		DefaultCORSConfig = middleware.CORSConfig{
			Skipper:      middleware.DefaultSkipper,
			AllowOrigins: []string{"*"},
			AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
		}
		err error
	)

	logrus.SetFormatter(&logrus.TextFormatter{DisableQuote: true, ForceColors: true})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.TraceLevel)

	defer func() {
		if r := recover(); r != nil {
			logrus.Fatal(r)
		}
	}()

	//AUTH SECRET
	hmacSampleSecret = make([]byte, 128)
	if _, err = rand.Read(hmacSampleSecret); err != nil {
		goto EXIT
	}

	//GORM
	if gormDB, err = gorm.Open(postgres.New(postgres.Config{DSN: Conf.DatabaseUrl}),
		&gorm.Config{Logger: logger.Default.LogMode(logger.Silent)}); err != nil {
		goto EXIT
	}
	if sqlDB, err = gormDB.DB(); err != nil {
		goto EXIT
	}
	sqlDB.SetMaxIdleConns(5)
	sqlDB.SetMaxOpenConns(20)

	driver, err = migratepg.WithInstance(sqlDB, &migratepg.Config{})
	if sourceDriver, err = iofs.New(migrationsFS, "migrations"); err != nil {
		goto EXIT
	}
	if migrator, err = migrate.NewWithInstance("iofs", sourceDriver, dbName, driver); err != nil {
		goto EXIT
	}
	if err = migrator.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		goto EXIT
	}

	//DB CACHE
	//@formatter:off
	if err = syncCatalogue(); err != nil {
		goto EXIT
	}
	if err = initAdminId(); err != nil {
		goto EXIT
	}
	//@formatter:on

	//ECHO
	engine = echo.New()
	engine.Use(middleware.CORSWithConfig(DefaultCORSConfig))

	engine.Use(echoMw.RequestLoggerWithConfig(echoMw.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, values echoMw.RequestLoggerValues) error {
			logrus.WithFields(logrus.Fields{
				"URI":    values.URI,
				"status": values.Status,
			}).Info("request")

			return nil
		},
	}))
	engine.Use(echoMw.Gzip())
	engine.Use(echoMw.StaticWithConfig(echoMw.StaticConfig{
		Root:       "ui",
		Index:      "index.html",
		Browse:     false,
		HTML5:      true,
		Filesystem: http.FS(ui),
	}))

	engine.HideBanner = true
	logrus.Info(consoleBanner)

	engine.GET("/api/catalogue/:instrument/:level", loadCatalogue)

	//currently we use the same handlers for fingering
	engine.GET("/api/tune/score/:tuneId", loadScore) //png
	engine.GET("/api/tune/score/meta/:tuneId", getScoreMeta)
	engine.GET("/api/tune/:tuneId", loadTune)
	engine.DELETE("/api/tune/:tuneId", deleteTune)
	engine.GET("/api/tune/download/:tuneId", downloadTune) //zip
	engine.POST("/api/tune", saveTune)
	engine.POST("/api/tune/fingering/:tuneId", saveFingering) //json
	engine.GET("/api/tune/audio/:tuneId", getAudio)

	engine.POST("/api/user/login", login)
	engine.GET("/api/user/subscription", subscription)
	engine.POST("/api/user/reset/send", sendPasswordResetLink)
	engine.POST("/api/user/activation/send", resendAccountActivationLink)
	engine.POST("/api/user/password/reset", resetPassword)
	engine.POST("/api/user/signup", signUp)
	engine.GET("/api/user/activate/:token", activate)

	engine.GET("/api/stats/:tuneId", getStats)
	engine.POST("/api/stats/:tuneId", postStats)
	engine.DELETE("/api/stats/:tuneId", deleteStats)

	engine.POST("/api/stripeCheckoutSessionCompleted", stripeWebhookEndpoint)

	err = engine.Start(Conf.ServerHost + ":" + strconv.Itoa(Conf.ServerPort))
	if err != nil {
		goto EXIT
	} else {
		return
	}

EXIT:
	println(err.Error())
	os.Exit(1)
}

func GetFileString(fileName string) string {
	file, _ := resources.Open(fileName)
	buf := new(bytes.Buffer)
	if _, err := buf.ReadFrom(file); err != nil {
		println("Couldn't read from file: {}", err.Error())
		return ""
	}
	return buf.String()
}

func GetFileStringFS(fileName string, fs *embed.FS) string {
	file, _ := fs.Open(fileName)
	buf := new(bytes.Buffer)
	if _, err := buf.ReadFrom(file); err != nil {
		println("Couldn't read from file: {}", err.Error())
		return ""
	}
	return buf.String()
}

func ExtractDbName(dsn string) string {
	output := map[string]string{}
	for _, pair := range strings.Split(dsn, " ") {
		kv := strings.Split(pair, "=")
		output[kv[0]] = kv[1]
	}
	return output["dbname"]
}
