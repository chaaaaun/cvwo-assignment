package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/router"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading environment variables")
	}
}

func main() {
	port := os.Getenv("PORT")

	r := router.Setup()
	fmt.Printf("Listening on port %s", port)

	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}
