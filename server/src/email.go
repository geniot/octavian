package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

func sendActivationEmail(email string, signUpToken string) error {
	var htmlBody = ACTIVATE_EMAIL_TEMPLATE
	htmlBody = strings.Replace(htmlBody, "${SIGNUP_TOKEN}", signUpToken, -1)
	return sendMailBrevo(&htmlBody, "Activate your Octavian account", email)
}

func sendPasswordResetEmail(email string, resetToken string) error {
	var htmlBody = RESET_PASSWORD_EMAIL_TEMPLATE
	htmlBody = strings.Replace(htmlBody, "${EMAIL_ADDRESS}", email, -1)
	htmlBody = strings.Replace(htmlBody, "${RESET_TOKEN}", resetToken, -1)
	return sendMailBrevo(&htmlBody, "Reset your Octavian password", email)
}

func sendPasswordResetConfirmationEmail(email string) error {
	var htmlBody = RESET_PASSWORD_CONFIRMATION_EMAIL_TEMPLATE
	htmlBody = strings.Replace(htmlBody, "${EMAIL_ADDRESS}", email, -1)
	return sendMailBrevo(&htmlBody, "Your password was reset", email)
}

func sendMailBrevo(HtmlBody *string, Subject string, Recipient string) error {
	var (
		sendMailModel = &BrevoSendMailModel{}
		jsonStr       []byte
		url           = Conf.Mail.BrevoCredentials.BrevoApiUrl
		req           *http.Request
		resp          *http.Response
		respBody      []byte
		client        = &http.Client{}
		err           error
	)
	sendMailModel.Sender = &BrevoExtendedEmail{Email: Conf.Mail.SenderEmail, Name: Conf.Mail.SenderName}
	sendMailModel.To = []*BrevoExtendedEmail{{Email: Recipient}}
	sendMailModel.Subject = Subject
	sendMailModel.HtmlContent = HtmlBody

	if jsonStr, err = json.Marshal(sendMailModel); err != nil {
		goto END
	}
	if req, err = http.NewRequest("POST", url, bytes.NewBuffer(jsonStr)); err != nil {
		goto END
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("api-key", Conf.Mail.BrevoCredentials.BrevoApiKey)

	log.Println("Sending email to: ", Recipient)
	if resp, err = client.Do(req); err != nil {
		goto END
	}
	defer closeBody(resp.Body)

	log.Println("response Status: ", resp.Status)
	log.Println("response Headers: ", resp.Header)
	if respBody, err = io.ReadAll(resp.Body); err != nil {
		goto END
	}
	log.Println("response Body: ", string(respBody))

END:
	if err != nil {
		log.Print(err)
		return sendMailSes(HtmlBody, Subject, Recipient)
	}
	return err
}

func sendMailSes(HtmlBody *string, Subject string, Recipient string) error {
	var (
		Sender               = Conf.Mail.SenderName + " <" + Conf.Mail.SenderEmail + ">"
		sess                 *session.Session
		result               *ses.SendEmailOutput
		configurationSetName = Conf.Mail.AwsSesCredentials.AwsSesConfigSet
		err                  error
	)
	if sess, err = session.NewSession(&aws.Config{
		Region: aws.String(Conf.Mail.AwsSesCredentials.AwsSesRegion),
		Credentials: credentials.NewStaticCredentials(
			Conf.Mail.AwsSesCredentials.AwsSesUsername,
			Conf.Mail.AwsSesCredentials.AwsSesPassword, ""),
	},
	); err != nil {
		return err
	}
	svc := ses.New(sess)

	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			CcAddresses: []*string{},
			ToAddresses: []*string{
				aws.String(Recipient),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(*HtmlBody),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(Subject),
			},
		},
		Source:               aws.String(Sender),
		ConfigurationSetName: &configurationSetName,
	}

	result, err = svc.SendEmail(input)
	if result != nil {
		println(result.String())
	}
	return err
}
