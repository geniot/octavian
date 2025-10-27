package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"time"
)

func RequestLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		t := time.Now()

		c.Next()

		latency := time.Since(t)

		fmt.Printf("%s %s %s %s %s\n",
			time.Now().Format("2006/01/02 15:04:05"),
			c.Request.Method,
			c.Request.RequestURI,
			c.Request.Header.Get("X-Real-IP"),
			latency,
		)
	}
}

func ResponseLogger() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("X-Content-Type-Options", "nosniff")
		c.Next()
	}
}
