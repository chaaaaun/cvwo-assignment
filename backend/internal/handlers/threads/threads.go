package threads

import (
	"context"
	"net/http"
	"strconv"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/dataaccess"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type keyThread struct{}

var (
	ErrNotFound = &api.ErrResponse{HTTPStatusCode: 404, StatusText: "Resource not found."}
)

func ThreadCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var thread *models.Thread
		var err error

		if threadID := chi.URLParam(r, "threadID"); threadID != "" {
			// string to int
			id, err := strconv.Atoi(threadID)
			if err != nil {
				render.Render(w, r, ErrNotFound)
			}
			thread, _ = dataaccess.DbGetThread(id)
		} else {
			render.Render(w, r, ErrNotFound)
			return
		}
		if err != nil {
			render.Render(w, r, ErrNotFound)
			return
		}

		ctx := context.WithValue(r.Context(), keyThread{}, thread)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func ListThreads(w http.ResponseWriter, r *http.Request) {

}

func SearchThreads(w http.ResponseWriter, r *http.Request) {

}

func GetThread(w http.ResponseWriter, r *http.Request) {

}

func CreateThread(w http.ResponseWriter, r *http.Request) {

}

func UpdateThread(w http.ResponseWriter, r *http.Request) {

}

func DeleteThread(w http.ResponseWriter, r *http.Request) {

}
