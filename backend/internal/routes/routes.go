package routes

import (
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/comments"
	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/threads"
	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/users"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func GetPublicRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Route("/api/user", func(r chi.Router) {
			r.Post("/login", users.AuthenticateUser)
			r.Post("/register", users.CreateUser)
		})

		r.Route("/api/thread", func(r chi.Router) {
			r.Get("/", threads.ListThreads)         // GET thread list
			r.Get("/{threadID}", threads.GetThread) // GET single thread
			r.Get("/search", threads.SearchThreads) // GET thread list with filter

			r.Get("/{threadID}/comment", comments.ListComments) // GET comment list
		})
	}
}

func GetProtectedRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		// JWT auth middleware
		tokenAuth := jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil)
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		// User auth middleware
		r.Use(users.UserCtx)

		// User CRUD
		r.Route("/api/auth/user", func(r chi.Router) {
			r.Get("/", users.GetCurrentUser)
		})

		r.Route("/api/auth/thread", func(r chi.Router) {
			// Thread CRUD
			r.Post("/", threads.CreateThread)
			r.Route("/{threadID}", func(r chi.Router) {
				r.Use(threads.ThreadCtx)
				r.Put("/", threads.UpdateThread)
				r.Delete("/", threads.DeleteThread)

				// Comment CRUD
				r.Post("/comment", comments.CreateComment)
				r.Route("/comment/{commentID}", func(r chi.Router) {
					r.Use(comments.CommentCtx)
					r.Put("/", comments.UpdateComment)
					r.Delete("/", comments.DeleteComment)
				})
			})
		})
	}
}
