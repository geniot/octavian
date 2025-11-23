package main

import (
	"bytes"
	"crypto/sha512"
	"embed"
	"encoding/base64"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

func first[T, U any](val T, _ U) T {
	return val
}

func Hash(data []byte) string {
	hasher := sha512.New()
	hasher.Write(data)
	return base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}

func If[T any](cond bool, vTrue, vFalse T) T {
	if cond {
		return vTrue
	}
	return vFalse
}

func GetFileString(fileName string, fs *embed.FS) string {
	file, _ := fs.Open(fileName)
	buf := new(bytes.Buffer)
	if _, err := buf.ReadFrom(file); err != nil {
		println("Couldn't read from file: {}", err.Error())
		return ""
	}
	return buf.String()
}

func toHash(pwd string) (*string, error) {
	var (
		passwordHashBbs []byte
		passwordHashStr string
		err             error
	)
	if len(pwd) > 20 || len(pwd) < 3 {
		return nil, errors.New("Incorrect password")
	}
	if passwordHashBbs, err = bcrypt.GenerateFromPassword([]byte(pwd), bcrypt.DefaultCost); err != nil {
		return nil, err
	}
	passwordHashStr = string(passwordHashBbs)
	return &passwordHashStr, nil
}
