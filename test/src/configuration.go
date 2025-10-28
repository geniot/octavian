package main

import (
	"github.com/num30/config"
	"github.com/sirupsen/logrus"
)

var (
	Conf = newConfig()
)

type Config struct {
	BaseApiUrl  string `default:"http://localhost:8222/api" validate:"required" envvar:"BASE_API_URL"`
	BaseUiUrl   string `default:"http://localhost:8222" validate:"required" envvar:"BASE_UI_URL"`
	DatabaseUrl string `default:"postgres://octavian_test:blaze_test@localhost:9876/octavian_test" validate:"required" envvar:"DATABASE_URL"`
	ResetUrl    string `default:"http://localhost:8444/reset" validate:"required" envvar:"RESET_URL"`
	ResetToken  string `default:"sometoken" validate:"required" envvar:"RESET_TOKEN"`
}

func newConfig() *Config {
	var (
		c   Config
		err error
	)
	if err = config.NewConfReader("myconf").Read(&c); err != nil {
		logrus.Fatal(err)
	}
	return &c
}
