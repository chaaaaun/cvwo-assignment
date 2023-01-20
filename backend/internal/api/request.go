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
