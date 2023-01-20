package routes

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/users"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/go-chi/chi/v5"
)

func GetNoAuthRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, req *http.Request) {
			println("root.")
		})

		r.Post("/login", func(w http.ResponseWriter, req *http.Request) {
			// Read payload body
			payload, err := ioutil.ReadAll(req.Body)
			if err != nil {
				fmt.Println("JSON decode error!")
				return
			}

			//
			data := &models.User{}
			if err := json.Unmarshal(payload, &data); err != nil {
				fmt.Println("JSON decode error!")
				return
			}

			fmt.Printf("user logged in")
		})

		r.Post("/register", users.CreateUser)
	}
}
