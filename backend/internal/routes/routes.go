package routes

import (
	"net/http"

	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/users"
	"github.com/go-chi/chi/v5"
)

func GetNoAuthRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			println("root.")
		})

		r.Post("/login", users.AuthenticateUser)
		r.Post("/register", users.CreateUser)
	}
}
