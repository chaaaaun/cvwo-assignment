package router

import (
	"errors"
	"net/http"
	"os"
	"path/filepath"

	"github.com/chauuun/cvwo-assignment/backend/internal/routes"
	"github.com/go-chi/chi/v5"
)

func Setup() chi.Router {
	r := chi.NewRouter()

	setUpRoutes(r)
	fileServer(r)
	return r
}

func setUpRoutes(r chi.Router) {
	r.Group(routes.GetPublicRoutes())
	r.Group(routes.GetProtectedRoutes())
}

// Serves frontend
func fileServer(router *chi.Mux) {
	workDir, _ := os.Getwd()
	filesDir := filepath.Join(workDir, "dist")

	router.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		if _, err := os.Stat(filesDir + r.URL.Path); errors.Is(err, os.ErrNotExist) {
			http.ServeFile(w, r, filepath.Join(filesDir, "index.html"))
		}
		http.ServeFile(w, r, filesDir+r.URL.Path)
	})
}
