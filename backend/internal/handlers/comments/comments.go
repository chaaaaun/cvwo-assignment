package comments

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
func CommentCtx(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var comment *models.Comment

		if commentID := chi.URLParam(r, "commentID"); commentID != "" {
			id, err := strconv.Atoi(commentID)
			if err != nil {
				render.Render(w, r, api.ErrNotFound(err))
			}

			comment, err = dataaccess.DbGetComment(id)
			if err != nil {
				render.Render(w, r, api.ErrUnprocessable(err))
			}
		} else {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid comment ID")))
			return
		}

		ctx := context.WithValue(r.Context(), models.CommentContextKey{}, comment)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func ListComments(w http.ResponseWriter, r *http.Request) {
	var threadId uint64
	var page int = 1
	var nextPage int = 2
	var previousPage int = 0
	var err error

	// Read pagination info
	if pageStr := r.URL.Query().Get("page"); pageStr != "" {
		page, err = strconv.Atoi(pageStr)
		if err != nil {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid page number")))
		} else if page < 0 {
			render.Render(w, r, api.ErrBadRequest(errors.New("page number cannot be negative")))
		}
	}
	if idStr := r.URL.Query().Get("threadId"); idStr != "" {
		threadId, err = strconv.ParseUint(idStr, 10, 64)
		if err != nil {
			render.Render(w, r, api.ErrBadRequest(errors.New("invalid page number")))
		} else if page < 0 {
			render.Render(w, r, api.ErrBadRequest(errors.New("page number cannot be negative")))
		}
	}

	if page > 1 {
		nextPage = page + 1
		previousPage = page - 1
	}

	// Get comments
	comments, total, _ := dataaccess.DbListComments(page, threadId)

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

	render.Status(r, http.StatusCreated)
}

func UpdateComment(w http.ResponseWriter, r *http.Request) {
	// Get context info
	comment := r.Context().Value(models.CommentContextKey{}).(*models.Comment)

	// Bind request body
	data := &api.CommentRequest{}
	if err := render.Bind(r, data); err != nil {
		render.Render(w, r, api.ErrBadRequest(err))
		return
	}

	if err := dataaccess.DbUpdateComment(data, comment); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	render.Status(r, http.StatusOK)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	// Get context info
	comment := r.Context().Value(models.CommentContextKey{}).(*models.Comment)

	if err := dataaccess.DbDeleteComment(comment); err != nil {
		render.Render(w, r, api.ErrUnprocessable(err))
		return
	}

	render.Status(r, http.StatusOK)
}
