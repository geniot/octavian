package main

type CatalogueTuneDTO struct {
	Id          int     `json:"id,omitempty"`
	OwnerId     int     `json:"ownerId,omitempty"`
	Title       *string `json:"title,omitempty"`
	Author      *string `json:"author,omitempty"`
	Instrument  *string `json:"instrument,omitempty"`
	Cover       *string `json:"cover,omitempty"`
	LevelNum    int     `json:"levelNum,omitempty"`
	PositionNum int     `json:"positionNum,omitempty"`
	BestScore   int     `json:"bestScore"`
	Credits     int     `json:"credits"`
}

type CatalogueModel struct {
	RequestedTunes *map[int]*CatalogueTuneDTO `json:"requestedTunes"`
	HasError       bool                       `json:"hasError,omitempty"`
	Message        *string                    `json:"message,omitempty"`
}

type TuneModel struct {
	Tune     *Tune   `json:"tune"`
	HasError bool    `json:"hasError,omitempty"`
	Message  *string `json:"message,omitempty"`
}

type ScoreMetaModel struct {
	TuneId   int     `json:"tuneId"`
	Parts    int     `json:"parts"`
	HasError bool    `json:"hasError,omitempty"`
	Message  *string `json:"message,omitempty"`
}

type RequestResetModel struct {
	Email           *string `json:"email,omitempty"`
	CaptchaResponse *string `json:"captchaResponse,omitempty"`
	HasError        bool    `json:"hasError,omitempty"`
	Message         *string `json:"message,omitempty"`
}

type ResetPasswordModel struct {
	ResetToken *string `json:"resetToken,omitempty"`
	HasError   bool    `json:"hasError,omitempty"`
	Message    *string `json:"message,omitempty"`
}

type SignupModel struct {
	Email           *string `json:"email,omitempty"`
	CaptchaResponse *string `json:"captchaResponse,omitempty"`
	HasError        bool    `json:"hasError,omitempty"`
	Message         *string `json:"message,omitempty"`
}

type ReCaptchaModel struct {
	Success     bool      `json:"success,omitempty"`
	ChallengeTs *string   `json:"challenge_ts,omitempty"`
	Hostname    *string   `json:"hostname,omitempty"`
	ErrorCodes  []*string `json:"error-codes,omitempty"`
}

type LoginModel struct {
	Email    *string `json:"email,omitempty"`
	Jwt      *string `json:"jwt,omitempty"`
	HasError bool    `json:"hasError,omitempty"`
	Message  *string `json:"message,omitempty"`
}

type SubscriptionModel struct {
	DaysLeft int64   `json:"daysLeft"`
	HasError bool    `json:"hasError,omitempty"`
	Message  *string `json:"message,omitempty"`
}

type BrevoSendMailModel struct {
	Sender      *BrevoExtendedEmail   `json:"sender,omitempty"`
	To          []*BrevoExtendedEmail `json:"to,omitempty"`
	Subject     string                `json:"subject,omitempty"`
	HtmlContent *string               `json:"htmlContent,omitempty"`
}

type StatsModel struct {
	SubmittedStats *StatsRecord   `json:"submittedStats,omitempty"`
	RequestedStats []*StatsRecord `json:"requestedStats,omitempty"`
	HasError       bool           `json:"hasError,omitempty"`
	Message        *string        `json:"message,omitempty"`
}

type MuseConversionRequest struct {
	MuseXml    *string `json:"museXml,omitempty"`
	PngHeight  int     `json:"pngHeight,omitempty"`
	Author     *string `json:"author,omitempty"`
	Title      *string `json:"title,omitempty"`
	Instrument *string `json:"instrument,omitempty"`
}

type MuseConversionResponse struct {
	PngSheet  *[]byte `json:"pngSheet,omitempty"`
	Mp3       *[]byte `json:"mp3,omitempty"`
	Tune      *Tune   `json:"tune,omitempty"`
	PngWidth  int     `json:"pngWidth,omitempty"`
	PngHeight int     `json:"pngHeight,omitempty"`
}

type ImageBoundary struct {
	from, to int
}

type PngScore struct {
	Id            int
	LastUpdatedOn int64
	Png           map[int][]byte
}
