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
	// 3 days for expiration of jwt token
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

func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value(models.UserContextKey{}).(string)
	render.Status(r, http.StatusOK)
	render.JSON(w, r, &api.UserResponse{User: user})
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &models.User{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}

	// Encrypt password
	salted := []byte(data.Password + data.ID)
	hashed, err := bcrypt.GenerateFromPassword(salted, passwordCost)
	if err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}
	data.Password = string(hashed[:])

	// Create User
	if err := dataaccess.DbCreateUser(data); err != nil {
		render.Render(w, r, api.ErrUnprocessable(errors.New("username taken")))
		return
	}

	// Return success
	render.Status(r, http.StatusCreated)
}

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

	// Authenticate
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), salted); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	// Generate jwt
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(jwtExpiration).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
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
}

func UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	data := &api.ChangePasswordRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}
}
