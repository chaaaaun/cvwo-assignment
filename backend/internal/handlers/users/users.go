package users

import (
	"context"
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/jwtauth/v5"
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
	// 3 days for JWT token expiration
	jwtExpiration time.Duration = time.Hour * 24 * 3
)

// Middleware that retrieves the currently authenticated user from JWT
func UserCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, _, err := jwtauth.FromContext(r.Context())
		if err != nil {
			render.Status(r, http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), models.UserContextKey{}, token.Subject())
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Retrieves currently authenticated user from context
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value(models.UserContextKey{}).(string)
	render.Status(r, http.StatusOK)
	render.JSON(w, r, &api.UserResponse{User: user})
}

// Generates password to insert user into DB
func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &models.User{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}

	// Encrypt password
	salted := []byte(data.Password + data.ID)
	if hashed, err := bcrypt.GenerateFromPassword(salted, passwordCost); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	} else {
		data.Password = string(hashed[:])
	}

	// Create User
	if err := dataaccess.DbCreateUser(data); err != nil {
		render.Render(w, r, api.ErrUnprocessable(errors.New("username taken")))
		return
	}

	render.Status(r, http.StatusCreated)
}

// Checks user supplied pasword against password in DB, generates JWT on success
func AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &models.User{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}
	salted := []byte(data.Password + data.ID)

	// Retreive user
	user, err := dataaccess.DbReadUser(data)
	if err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), salted); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(jwtExpiration).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	render.Status(r, http.StatusOK)
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Path:     "/",
		HttpOnly: true,
		SameSite: 3,
		Value:    tokenString,
		Expires:  time.Now().Add(jwtExpiration),
	})
}
