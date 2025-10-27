package main

import (
	"bytes"
	"encoding/base64"
	"errors"
	"fmt"
	"image"
	"image/png"
	"io"
	"math/rand"
	"mime/multipart"
	"net/http"
	"net/mail"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func first[T, U any](val T, _ U) T {
	return val
}

func authenticate(tokenString *string) (jwt.MapClaims, error) {
	var (
		claims jwt.MapClaims
		err    error
	)
	if tokenString == nil {
		return claims, errors.New("JWT not provided")
	}
	if claims, err = claimsFromToken(*tokenString); err != nil {
		return claims, err
	}
	if time.Now().UnixMilli() > int64(claims["ttl"].(float64)) {
		return claims, errors.New("JWT has expired")
	}

	return claims, nil
}

func claimsFromToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return hmacSampleSecret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil {
		return nil, err
	} else {
		return token.Claims.(jwt.MapClaims), nil
	}
}

// todo: check the uniqueness of our tokens
func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func isPassword(password string) bool {
	if len(password) > 20 || len(password) < 3 {
		return false
	} else {
		return true
	}
}

func isEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err == nil
}

func base64ToHash(pwd string) (*string, error) {
	var (
		password        string
		passwordBbs     []byte
		passwordHashBbs []byte
		passwordHashStr string
		err             error
	)
	if len(pwd) > 20 || len(pwd) < 3 {
		return nil, errors.New(messageProperties.GetString("account.incorrect_password", ""))
	}
	if passwordBbs, err = base64.StdEncoding.DecodeString(pwd); err != nil {
		return nil, err
	}
	password = string(passwordBbs)
	if passwordHashBbs, err = bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost); err != nil {
		return nil, err
	}
	passwordHashStr = string(passwordHashBbs)
	return &passwordHashStr, nil
}

func patchStandard(fileString string) string {
	fileString = strings.Replace(fileString, "${BASE_API_URL}", Conf.BaseApiUrl, -1)
	fileString = strings.Replace(fileString, "${BASE_UI_URL}", Conf.BaseUiUrl, -1)
	return fileString
}

func ptr[T any](x T) *T {
	return &x
}

func closeBody(body io.ReadCloser) {
	if err := body.Close(); err != nil {
		println("Couldn't close the body of the response.")
	}
}

func getUserFromToken(jwtToken *string) (int, int, error) {
	var (
		userId       float64
		claims       jwt.MapClaims
		responseCode = http.StatusOK
		err          error
	)
	if claims, err = authenticate(jwtToken); err != nil {
		responseCode = http.StatusUnauthorized
		goto END
	}
	if claims[JWT_KEY_USER_ID] == nil {
		err = errors.New("user id not found in jwt token")
		responseCode = http.StatusUnauthorized
		goto END
	} else {
		userId = claims[JWT_KEY_USER_ID].(float64)
	}
END:
	return int(userId), responseCode, err
}

func readFormFile(uploadForm *multipart.Form, fieldName string) *[]byte {
	var (
		files     []*multipart.FileHeader
		file      io.Reader
		fileBytes []byte
		err       error
	)
	files = uploadForm.File[fieldName]
	if len(files) == 0 {
		return nil
	}
	if file, err = files[0].Open(); err != nil {
		return nil
	}
	if fileBytes, err = io.ReadAll(file); err != nil {
		return nil
	}
	return &fileBytes
}

func img2bytes(img image.Image) ([]byte, error) {
	buf := new(bytes.Buffer)
	err := png.Encode(buf, img)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}
