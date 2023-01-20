package models

import "net/http"

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (a *User) Bind(r *http.Request) error {
	// TODO: sanitise and validate input on client side
	// if a.Username == "" || a.Password == "" {
	// 	return errors.New("Missing required login fields.")
	// }
	return nil
}

func (a *User) Render(w http.ResponseWriter, r *http.Request) error {
	return nil
}
