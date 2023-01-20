package routes

import (
	"fmt"
	"net/http"
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/users"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func GetPublicRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("welcome anonymous"))
		})

		r.Post("/login", users.AuthenticateUser)
		r.Post("/register", users.CreateUser)
	}
}

func GetProtectedRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		// JWT auth middleware
		tokenAuth := jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil)
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)

		// Protected routes
		r.Get("/protected", func(w http.ResponseWriter, r *http.Request) {
			_, claims, _ := jwtauth.FromContext(r.Context())
			w.Write([]byte(fmt.Sprintf("protected area. hi %v", claims["user_id"])))
		})
	}
}
