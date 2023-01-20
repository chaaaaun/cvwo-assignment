package comments

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/dataaccess"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func ListComments(w http.ResponseWriter, r *http.Request) {
	var page int = 0
	var nextPage int = 1
	var previousPage int = 0
	var err error

	// Read pagination info
	if pageStr := chi.URLParam(r, "page"); pageStr != "" {
		page, err = strconv.Atoi(pageStr)
		if err != nil {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid page number")))
		} else if page < 0 {
			render.Render(w, r, api.ErrBadRequest(errors.New("page number cannot be negative")))
		}
	}

	if page > 0 {
		nextPage = page + 1
		previousPage = page - 1
	}

	// Get comments
	comments, total, _ := dataaccess.DbListComments(page)

	render.JSON(w, r, &api.CommentResponse{
		Metadata: api.PaginationMetadata{
			NextPage:     nextPage,
			PreviousPage: previousPage,
			CurrentPage:  page,
			TotalPages:   total,
		},
		Payload: *comments,
	})
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	// Get context info
	user := r.Context().Value(models.UserContextKey{}).(string)
	thread := r.Context().Value(models.ThreadContextKey{}).(*models.Thread)

	// Bind request body
	data := &api.CommentRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}

	if err := dataaccess.DbCreateComment(data, thread.ID, user); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}
}
