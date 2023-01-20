package api

import "net/http"

type ChangePasswordRequest struct {
	UserID  string `json:"user"`
	OldPass string `json:"old"`
	NewPass string `json:"new"`
}

func (a *ChangePasswordRequest) Bind(r *http.Request) error {
	return nil
}

type ThreadRequest struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Tags    string `json:"tags"`
}

func (a *ThreadRequest) Bind(r *http.Request) error {
	return nil
}
