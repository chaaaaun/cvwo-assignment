package api

import (
	"net/http"

	"github.com/go-chi/render"
)

type Response struct {
	Metadata string   `json:"metadata,omitempty"`
	Payload  []string `json:"data"`
}

type AuthResponse struct {
	Token string `json:"token"`
}

type UserResponse struct {
	User string `json:"user"`
}

type ErrResponse struct {
	HTTPStatusCode int    `json:"statusCode"`              // http response status code
	StatusText     string `json:"statusMessage,omitempty"` // user-level status message
	ErrorText      string `json:"errorMessage,omitempty"`  // application-level error message
}

func (e *ErrResponse) Render(w http.ResponseWriter, r *http.Request) error {
	render.Status(r, e.HTTPStatusCode)
	return nil
}

func ErrBadRequest(err error) render.Renderer {
	return &ErrResponse{
		HTTPStatusCode: 400,
		StatusText:     "Error invalid request.",
		ErrorText:      err.Error(),
	}
}

func ErrUnprocessable(err error) render.Renderer {
	return &ErrResponse{
		HTTPStatusCode: 422,
		StatusText:     "Error processing request.",
		ErrorText:      err.Error(),
	}
}
