package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/router"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading environment variables")
	}

	if err := database.GetDB(); err != nil {
		log.Fatal("Error connecting to database")
	}
}

func main() {
	port := os.Getenv("PORT")

	r := router.Setup()
	fmt.Printf("Listening on port %s", port)

	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}
