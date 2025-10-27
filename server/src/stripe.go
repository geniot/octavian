package main

import (
	"encoding/json"
	"io"
	"log"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/webhook"
)

func stripeWebhookEndpoint(c echo.Context) error {
	var (
		jsonData       []byte
		user           User
		event          stripe.Event
		session        stripe.CheckoutSession
		err            error
		subscribedTill int64
		days           = int64(0)
	)
	log.Println("Processing stripeWebhookEndpoint")
	if jsonData, err = io.ReadAll(c.Request().Body); err != nil {
		goto END
	}
	if event, err = webhook.ConstructEvent(jsonData, c.Request().Header.Get("Stripe-Signature"), Conf.StripeEndpointSecret); err != nil {
		goto END
	}
	if err = json.Unmarshal(event.Data.Raw, &session); err != nil {
		goto END
	}

	//find user by email
	if err = gormDB.
		Debug().
		Table("users").
		Where(&User{Email: &session.CustomerDetails.Email}).
		First(&user).Error; err != nil {
		println("Couldn't find user by email: ", session.CustomerDetails.Email, err.Error())
		goto END
	}
	subscribedTill = user.SubscribedTill
	if user.SubscribedTill < time.Now().UnixMilli() {
		subscribedTill = time.Now().UnixMilli()
	}
	days = GetDaysWithBonus(session.AmountTotal / 100)
	//update the user's subscription
	if err = gormDB.
		Debug().
		Table("users").
		Select("subscribed_till").
		Where("id = ?", user.Id).
		Updates(User{SubscribedTill: subscribedTill + days*MILLISECONDS_PER_DAY}).
		Error; err != nil {
		goto END
	}

END:
	if err != nil {
		log.Println(err)
	}
	return err
}

func GetDaysWithBonus(amount int64) int64 {
	for i := len(bonuses) - 1; i >= 0; i-- {
		if amount >= bonuses[i].amount {
			return int64(float64(amount) * bonuses[i].factor)
		}
	}
	return amount
}

type Bonus struct {
	amount int64
	factor float64
}

var bonuses = []Bonus{
	{amount: 0, factor: 1},
	{amount: 20, factor: 1.5},
	{amount: 50, factor: 2},
	{amount: 80, factor: 2.5},
	{amount: 120, factor: 3},
	{amount: 200, factor: 3.5},
	{amount: 250, factor: 4},
	{amount: 300, factor: 4.5},
	{amount: 365, factor: 5},
}
