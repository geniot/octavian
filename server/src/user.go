package main

import (
	"encoding/base64"
	"errors"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func initAdminId() (err error) {
	if err = gormDB.
		Debug().
		Model(&User{}).
		Select("id").
		Table("users").
		Where("role='" + ADMIN + "'").
		First(&adminId).Error; err != nil {
		return err
	}
	return nil
}

func subscription(c echo.Context) error {
	var (
		subscriptionModel = SubscriptionModel{}
		user              User
		jwtToken          = c.Request().Header.Get(X_JWT)
		userId            int
		responseCode      = http.StatusOK
		err               error
	)
	if userId, responseCode, err = getUserFromToken(&jwtToken); err != nil {
		goto END
	}

	if err = gormDB.
		Debug().
		Table("users").
		Select("subscribed_till").
		Where("id = ?", userId).
		First(&user).Error; err != nil {
		goto END
	}
	subscriptionModel.DaysLeft = GetDays(time.Now().UnixMilli(), user.SubscribedTill)

END:
	if err != nil {
		subscriptionModel.HasError = true
		errText := err.Error()
		subscriptionModel.Message = &errText
	}
	return c.JSON(responseCode, subscriptionModel)
}

func login(c echo.Context) error {
	var (
		loginModel         = LoginModel{}
		password           = c.Request().Header.Get(X_PASS)
		user               User
		isAuthorized       = false
		passwordBytes      []byte
		defaultErrorMsg    = messageProperties.GetString("account.incorrect_email_or_password", "")
		accNotActivatedMsg = messageProperties.GetString("account.not_activated", "")
		err                error
	)

	if err = c.Bind(&loginModel); err != nil {
		goto END
	}
	loginModel.Message = nil
	loginModel.HasError = false

	if err = gormDB.
		Debug().
		Table("users").
		Where(&User{Email: loginModel.Email}).
		First(&user).Error; err != nil {
		goto END
	}

	if user.Role == REGISTERED {
		loginModel.Message = &accNotActivatedMsg
		err = errors.New(accNotActivatedMsg)
		goto END
	}

	if isPassword(password) {
		if passwordBytes, err = base64.StdEncoding.DecodeString(password); err != nil {
			goto END
		}
		isAuthorized = bcrypt.CompareHashAndPassword([]byte(*user.PasswordHash), passwordBytes) == nil
	} else if _, err = authenticate(loginModel.Jwt); err != nil {
		goto END
	} else {
		isAuthorized = true
	}

	if isAuthorized {
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			JWT_KEY_USER_ID: user.Id,
			JWT_KEY_ROLE:    user.Role,
			JWT_KEY_TTL:     time.Now().UnixMilli() + timeToLive,
		})
		tokenString, _ := token.SignedString(hmacSampleSecret)
		loginModel.Jwt = &tokenString
	}

END:
	if err != nil || !isAuthorized {
		log.Println(err)
		loginModel.HasError = true
		loginModel.Jwt = nil
		if loginModel.Message == nil {
			loginModel.Message = &defaultErrorMsg
		}
	}
	return c.JSON(200, loginModel)
}

// when user signs up, she is sent an email, but in rare cases the user may need to request this email again
func resendAccountActivationLink(c echo.Context) error {
	var (
		requestResetModel = RequestResetModel{}
		user              User
		err               error
	)
	//VALIDATION
	if err = c.Bind(&requestResetModel); err != nil {
		goto END
	}
	requestResetModel.Message = nil
	requestResetModel.HasError = false

	if err = gormDB.
		Table("users").
		Where(&User{Email: requestResetModel.Email}).
		First(&user).Error; err != nil {
		err = errors.New(messageProperties.GetString("account.incorrect_email", ""))
		goto END
	}

	if user.Role == REGISTERED {
		if err = sendActivationEmail(*user.Email, *user.SignUpToken); err != nil {
			goto END
		}
	} else {
		err = errors.New(messageProperties.GetString("account.account_activated", ""))
		goto END
	}

END:
	if err != nil {
		requestResetModel.HasError = true
		errMessage := err.Error()
		requestResetModel.Message = &errMessage
	}
	return c.JSON(200, requestResetModel)
}

func sendPasswordResetLink(c echo.Context) error {
	var (
		requestResetModel      = RequestResetModel{}
		nextResetPasswordToken string
		user                   User
		err                    error
	)
	//VALIDATION
	if err = c.Bind(&requestResetModel); err != nil {
		goto END
	}
	requestResetModel.Message = nil
	requestResetModel.HasError = false

	if err = gormDB.
		Table("users").
		Where(&User{Email: requestResetModel.Email}).
		First(&user).Error; err != nil {
		err = errors.New(messageProperties.GetString("account.incorrect_email", ""))
		goto END
	}

	//ACTION
	nextResetPasswordToken = randSeq(32)
	if err = gormDB.
		Debug().
		Table("users").
		Select("ResetPasswordToken", "ResetRequestedWhen").
		Where("id = ?", user.Id).
		Updates(User{ResetPasswordToken: &nextResetPasswordToken, ResetRequestedWhen: time.Now().UnixMilli()}).
		Error; err != nil {
		goto END
	}
	if err = sendPasswordResetEmail(*user.Email, nextResetPasswordToken); err != nil {
		goto END
	}

END:
	if err != nil {
		requestResetModel.HasError = true
		errMessage := err.Error()
		requestResetModel.Message = &errMessage
	}
	return c.JSON(200, requestResetModel)
}

func resetPassword(c echo.Context) error {
	var (
		resetPasswordModel = ResetPasswordModel{}
		user               User
		newPasswordHashStr *string
		successMessage     = messageProperties.GetString("account.password_reset", "")
		err                error
	)
	if newPasswordHashStr, err = base64ToHash(c.Request().Header.Get(X_PASS)); err != nil {
		err = errors.New(messageProperties.GetString("account.incorrect_password", ""))
		goto END
	}

	//deserialize
	if err = c.Bind(&resetPasswordModel); err != nil {
		goto END
	}
	resetPasswordModel.Message = nil
	resetPasswordModel.HasError = false

	if resetPasswordModel.ResetToken == nil {
		err = errors.New(messageProperties.GetString("account.incorrect_token", ""))
		goto END
	}

	//find user by token
	if err = gormDB.
		Debug().
		Table("users").
		Where(&User{ResetPasswordToken: resetPasswordModel.ResetToken}).
		First(&user).Error; err != nil {
		println(err.Error())
		err = errors.New(messageProperties.GetString("account.incorrect_token", ""))
		goto END
	}
	//is token expired
	if time.Now().UnixMilli()-user.ResetRequestedWhen > tokenExpiration {
		err = errors.New(messageProperties.GetString("account.token_expired", ""))
		goto END
	}
	//in rare cases when user hasn't received the activation email and forgot her password, we use reset password for both
	if user.Role == REGISTERED {
		user.Role = CONFIRMED
	}

	//update the password and the role to CONFIRMED if necessary
	if err = gormDB.
		Debug().
		Table("users").
		Select("PasswordHash", "ResetPasswordToken", "Role").
		Where("id = ?", user.Id).
		Updates(User{PasswordHash: newPasswordHashStr, ResetPasswordToken: nil, Role: user.Role}).
		Error; err != nil {
		goto END
	}

	//success action: send confirmation email
	if err = sendPasswordResetConfirmationEmail(*user.Email); err != nil {
		goto END
	}

END:
	if err != nil {
		resetPasswordModel.HasError = true
		errMessage := err.Error()
		resetPasswordModel.Message = &errMessage
	} else {
		resetPasswordModel.Message = &successMessage
	}
	return c.JSON(200, resetPasswordModel)
}

func signUp(c echo.Context) error {
	var (
		signupModel     = SignupModel{}
		user            = &User{}
		count           int64
		passwordHashStr *string
		nextSignUpToken *string
		err             error
	)
	//retrieving password, hashing
	if passwordHashStr, err = base64ToHash(c.Request().Header.Get(X_PASS)); err != nil {
		err = errors.New(messageProperties.GetString("account.incorrect_password", ""))
		goto END
	}

	//deserialize
	if err = c.Bind(&signupModel); err != nil {
		goto END
	}
	signupModel.Message = nil
	signupModel.HasError = false

	//validate email and password
	if !isEmail(*signupModel.Email) {
		err = errors.New(messageProperties.GetString("account.incorrect_email_or_password", ""))
		goto END
	}

	//check if email is already registered
	if err = gormDB.
		Debug().
		Table("users").
		Where("email = ?", signupModel.Email).
		Count(&count).Error; err != nil {
		println(err.Error())
		goto END
	}
	if count != 0 {
		err = errors.New(messageProperties.GetString("account.email_already_taken", ""))
		goto END
	}
	nextSignUpToken = ptr(randSeq(32))
	//inserting the new user
	user = &User{Email: signupModel.Email, Role: REGISTERED, PasswordHash: passwordHashStr, SignUpToken: nextSignUpToken, SubscribedTill: time.Now().UnixMilli()}
	if err = gormDB.
		Debug().
		Table("users").
		Create(user).Error; err != nil {
		println(err.Error())
		goto END
	}
	//send activation email
	if err = sendActivationEmail(*signupModel.Email, *nextSignUpToken); err != nil {
		goto END
	}

END:
	if err != nil {
		signupModel.HasError = true
		errMessage := err.Error()
		signupModel.Message = &errMessage
	}
	return c.JSON(200, signupModel)
}

// when user clicks on a link in the welcome email
func activate(c echo.Context) error {
	var (
		htmlBody = ACTIVATED_TEMPLATE
		user     User
		token    = c.Param("token")
		err      error
	)
	//find user by token
	if err = gormDB.
		Debug().
		Table("users").
		Where(&User{SignUpToken: &token}).
		First(&user).Error; err != nil {
		println(err.Error())
		goto END
	}
	if user.Role != REGISTERED {
		err = errors.New("activation is only possible for users with unconfirmed email address")
		goto END
	}

	//update the password
	if err = gormDB.
		Debug().
		Table("users").
		Select("Role").
		Where("id = ?", user.Id).
		Updates(User{Role: CONFIRMED}).
		Error; err != nil {
		goto END
	}

END:
	if err != nil {
		log.Println(err)
		htmlBody = strings.Replace(htmlBody, "${ACTIVATION_MESSAGE}",
			messageProperties.GetString("activate.failed", ""), -1)
	} else {
		htmlBody = strings.Replace(htmlBody, "${ACTIVATION_MESSAGE}",
			messageProperties.GetString("activate.success", ""), -1)
	}
	return c.Blob(http.StatusOK, "text/html", []byte(htmlBody))
}
