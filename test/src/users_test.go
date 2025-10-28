package main

import (
	"net/http"
	"testing"

	"github.com/gavv/httpexpect/v2"
)

func TestUserCrud(t *testing.T) {
	t.Parallel()
	var (
		e = httpexpect.Default(t, Conf.BaseApiUrl)
	)

	e.POST("/user/login").Expect().Status(http.StatusOK).
		JSON().Object().Value("message").String().IsEqual("Incorrect email or password.")
}
