package main

import (
	"bytes"
	"embed"
	"encoding/json"
	"net/http"
	"os"
	"testing"

	"github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

type ResetRequest struct {
	ResetToken  string `json:"resetToken,omitempty"`
	DatabaseUrl string `json:"databaseUrl,omitempty"`
	Sql         string `json:"sql,omitempty"`
}

var (
	loginTokenDuration = int64(2592000000)
	//go:embed res/reset.sql
	resetSqlFS embed.FS
)

func TestMain(m *testing.M) {
	setup()
	m.Run()
	teardown()
}

func setup() {
	var (
		resetSql     = GetFileString("res/reset.sql", &resetSqlFS)
		resetRequest = ResetRequest{ResetToken: Conf.ResetToken, Sql: resetSql, DatabaseUrl: Conf.DatabaseUrl}
	)
	logrus.SetFormatter(&logrus.TextFormatter{DisableQuote: true, ForceColors: true})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.TraceLevel)

	defer func() {
		if r := recover(); r != nil {
			logrus.Fatal(r)
		}
	}()

	jsonValue, _ := json.Marshal(resetRequest)
	logrus.Info(string(jsonValue))
	logrus.Info(Conf.BaseApiUrl)
	logrus.Info(Conf.BaseUiUrl)
	logrus.Info(Conf.ResetUrl)

	pwd := "demo"
	demoPwdHash := first(toHash(pwd))
	isAuthorized := bcrypt.CompareHashAndPassword([]byte(*demoPwdHash), []byte(pwd)) == nil
	logrus.Info(isAuthorized)
	logrus.Info(*demoPwdHash)

	res, err := http.Post(Conf.ResetUrl, "application/json", bytes.NewBuffer(jsonValue))
	if err != nil || res.StatusCode != 200 {
		logrus.Fatalf("error making http request: %s\n", err)
		os.Exit(1)
	}
}

func teardown() {
}
