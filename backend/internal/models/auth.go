package models

type LoginRequest struct {
	UserID   int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}
