package users

import (
	"net/http"
	"os"
	"time"

	"github.com/go-chi/render"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/dataaccess"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

const (
	// Cost for generating bcrypt hash
	passwordCost int = 10
	// 3 days for expiration of jwt token
	jwtExpiration time.Duration = time.Hour * 24 * 3

	ErrInvalidJson = "Invalid JSON"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &models.User{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Encrypt password
	salted := []byte(data.Password + data.Username)
	hashed, err := bcrypt.GenerateFromPassword(salted, passwordCost)
	data.Password = string(hashed[:])

	if err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Create User
	if err := dataaccess.DbCreateUser(data); err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Return success
	render.Status(r, http.StatusCreated)
}

func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &models.User{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}
	salted := []byte(data.Password + data.Username)

	// Retreive user
	user, err := dataaccess.DbReadUser(data)
	if err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Authenticate
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), salted); err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Generate jwt
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.Username,
		"exp": time.Now().Add(jwtExpiration).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	atCookie := http.Cookie{
		Name:     "jwt",
		Path:     "/",
		SameSite: 2,
		Value:    tokenString,
		Expires:  time.Now().Add(jwtExpiration),
	}

	// Return success
	render.Status(r, http.StatusOK)
	http.SetCookie(w, &atCookie)
	render.JSON(w, r, &api.AuthResponse{
		Token: tokenString,
	})
}
