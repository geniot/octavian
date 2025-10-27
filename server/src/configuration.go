package main

import (
	"strings"

	"github.com/num30/config"
	"github.com/sirupsen/logrus"
)

var (
	Conf = newConfig()
)

type Config struct {
	ServerHost                 string `default:"localhost" validate:"required" envvar:"SERVER_HOST"`
	ServerPort                 int    `default:"8222" validate:"required" envvar:"SERVER_PORT"`
	DatabaseUrl                string `default:"postgres://octavian_test:octavian_test@localhost:9876/octavian_test" validate:"required" envvar:"DATABASE_URL"`
	BaseApiUrl                 string `default:"http://localhost:8222/api" validate:"required" envvar:"BASE_API_URL"`
	BaseUiUrl                  string `default:"http://localhost:8222" validate:"required" envvar:"BASE_UI_URL"`
	ConvertUrl                 string `default:"http://localhost:8333/convert" validate:"required" envvar:"CONVERT_URL"`
	Mail                       Mail   `default:{}`
	LoginTokenDuration         int64  `default:"2592000000" envvar:"LOGIN_TOKEN_DURATION"`
	ResetPasswordTokenDuration int64  `default:"1200000" envvar:"RESET_PASSWORD_TOKEN_DURATION"`
	JwtSigningKey              string `default:"" envvar:"JWT_SIGNING_KEY"`
	StripeEndpointSecret       string `default:"" envvar:"STRIPE_ENDPOINT_SECRET"`
}

type Mail struct {
	SenderName        string            `default:"Octavian" validate:"required" envvar:"SENDER_NAME"`
	SenderEmail       string            `default:"playoctavianapp@gmail.com" validate:"required" envvar:"SENDER_EMAIL"`
	SmtpProvider      string            `default:"none" envvar:"SMTP_PROVIDER"`
	AwsSesCredentials AwsSesCredentials `default:{}`
	BrevoCredentials  BrevoCredentials  `default:{}`
}

type AwsSesCredentials struct {
	AwsSesConfigSet string `default:"my-first-configuration-set" envvar:"AWS_SES_CONFIG_SET"`
	AwsSesUsername  string `default:"" envvar:"ASWS_USERNAME"`
	AwsSesPassword  string `default:"" envvar:"AWS_SES_PASSWORD"`
	AwsSesRegion    string `default:"eu-north-1" envvar:"AWS_SES_REGION"`
}

type BrevoCredentials struct {
	BrevoApiUrl string `default:"https://api.brevo.com/v3/smtp/email" envvar:"BREVO_API_URL"`
	BrevoApiKey string `default:"" envvar:"BREVO_API_KEY"`
}

func newConfig() *Config {
	var (
		c   Config
		err error
	)
	if err = config.NewConfReader("myconf").Read(&c); err != nil {
		logrus.Fatal(err)
	}
	if len(strings.TrimSpace(c.JwtSigningKey)) == 0 {
		c.JwtSigningKey = randSeq(128)
	}
	return &c
}
