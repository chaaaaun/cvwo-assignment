package routes

import (
	"context"
	"net/http"
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/comments"
	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/threads"
	"github.com/chauuun/cvwo-assignment/backend/internal/handlers/users"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth/v5"
)

func GetPublicRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			// TODO: serve static files here
			w.Write([]byte("welcome anonymous"))
		})

		r.Post("/login", users.AuthenticateUser)
		r.Post("/register", users.CreateUser)

		r.Route("/api/thread", func(r chi.Router) {
			r.Get("/", threads.ListThreads)         // GET /thread
			r.Get("/search", threads.SearchThreads) // GET /thread/search
		})

		r.Get("/api/comment", comments.ListComments)
	}
}

func GetProtectedRoutes() func(r chi.Router) {
	return func(r chi.Router) {
		// JWT auth middleware
		tokenAuth := jwtauth.New("HS256", []byte(os.Getenv("JWT_SECRET")), nil)
		r.Use(jwtauth.Verifier(tokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(UserExtractor)

		r.Get("/user", users.GetCurrentUser)
		r.Post("/user", users.UpdateUserPassword)

		// Thread CRUD
		r.Route("/api/auth/thread", func(r chi.Router) {
			r.Post("/", threads.CreateThread) // POST /thread

			// Subrouters:
			r.Route("/{threadID}", func(r chi.Router) {
				r.Use(threads.ThreadCtx)
				r.Get("/", threads.GetThread)       // GET /thread/123
				r.Put("/", threads.UpdateThread)    // PUT /thread/123
				r.Delete("/", threads.DeleteThread) // DELETE /thread/123

				r.Post("/comment", comments.CreateComment)               // POST /comment
				r.Put("/comment/{commentID}", comments.UpdateComment)    // PUT /comment/123
				r.Delete("/comment/{commentID}", comments.DeleteComment) // DELETE /comment/123
			})
		})
	}
}

func UserExtractor(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token, _, err := jwtauth.FromContext(r.Context())

		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		// Token is authenticated, pass it through
		ctx := context.WithValue(r.Context(), models.UserContextKey{}, token.Subject())
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
