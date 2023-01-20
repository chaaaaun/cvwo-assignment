package users

import (
	"net/http"

	"github.com/go-chi/render"
	"golang.org/x/crypto/bcrypt"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/dataaccess"
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

const (
	passwordCost = 10

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
	hashed, err := bcrypt.GenerateFromPassword([]byte(data.Password), passwordCost)
	data.Password = string(hashed[:])
	if err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Create User
	if err := dataaccess.DbCreateUser(database.DB, data); err != nil {
		render.Render(w, r, api.ErrRender(err))
		return
	}

	// Return success
	render.Status(r, http.StatusCreated)
	render.JSON(w, r, &api.Response{
		Payload:   []string{data.Username + " created"},
		ErrorCode: -1,
	})
}
