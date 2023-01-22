package threads

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/dataaccess"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

// Middleware that retrieves the requested thread and passes it to handlers down the line
func ThreadCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var thread *models.Thread

		if threadID := chi.URLParam(r, "threadID"); threadID != "" {
			id, err := strconv.Atoi(threadID)
			if err != nil {
				render.Render(w, r, api.ErrNotFound(err))
			}

			thread, err = dataaccess.DbGetThread(id)
			if err != nil {
				render.Render(w, r, api.ErrUnprocessable(err))
			}
		} else {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid thread ID")))
			return
		}

		ctx := context.WithValue(r.Context(), models.ThreadContextKey{}, thread)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func ListThreads(w http.ResponseWriter, r *http.Request) {
	var page int = 0
	var nextPage int = 1
	var previousPage int = 0
	var err error
	// Read pagination info
	if pageStr := chi.URLParam(r, "page"); pageStr != "" {
		page, err = strconv.Atoi(pageStr)
		if err != nil {
			render.Render(w, r, api.ErrNotFound(err))
		} else if page < 0 {
			render.Render(w, r, api.ErrBadRequest(errors.New("page number cannot be negative")))
		}
	}

	if page > 0 {
		nextPage = page + 1
		previousPage = page - 1
	}

	// Get threads
	threads, total, _ := dataaccess.DbListThreads(page)

	render.JSON(w, r, &api.ThreadResponse{
		Metadata: api.PaginationMetadata{
			NextPage:     nextPage,
			PreviousPage: previousPage,
			CurrentPage:  page,
			TotalPages:   total,
		},
		Payload: *threads,
	})
}

func SearchThreads(w http.ResponseWriter, r *http.Request) {

}

func GetThread(w http.ResponseWriter, r *http.Request) {
	var id int
	var err error
	if idStr := chi.URLParam(r, "threadID"); idStr != "" {
		id, err = strconv.Atoi(idStr)
		if err != nil {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid ID")))
		}
	}

	thread, _ := dataaccess.DbGetThread(id)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, &api.ThreadResponse{
		Payload: []models.Thread{*thread},
	})
}

func CreateThread(w http.ResponseWriter, r *http.Request) {
	// Bind request body
	data := &api.ThreadRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}
	user := r.Context().Value(models.UserContextKey{}).(string)
	if err := dataaccess.DbCreateThread(data, user); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}
}

func UpdateThread(w http.ResponseWriter, r *http.Request) {
	// Get context info
	thread := r.Context().Value(models.ThreadContextKey{}).(*models.Thread)
	// Bind request body
	data := &api.ThreadRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}
	thread.Title = data.Title
	thread.Content = data.Content
	thread.Tags = data.Tags
	if err := dataaccess.DbUpdateThread(thread); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	render.Status(r, http.StatusOK)
}

func DeleteThread(w http.ResponseWriter, r *http.Request) {
	thread := r.Context().Value(models.ThreadContextKey{}).(*models.Thread)
	if err := dataaccess.DbDeleteThread(thread); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}
	render.Status(r, http.StatusOK)
}
