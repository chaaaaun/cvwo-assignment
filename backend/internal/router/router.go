package router

import (
	"net/http"

	"github.com/chauuun/cvwo-assignment/backend/internal/routes"
	"github.com/go-chi/chi/v5"
)

func Setup() chi.Router {
	r := chi.NewRouter()
	setUpRoutes(r)
	return r
}

func setUpRoutes(r chi.Router) {
	// Routes that do not require auth
	r.Group(routes.GetNoAuthRoutes())

	r.Get("/panic", func(w http.ResponseWriter, r *http.Request) {
		panic("test")
	})
}
