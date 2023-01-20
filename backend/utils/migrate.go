package main

import (
	"log"

	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading environment variables")
	}
}

func main() {
	db, _ := database.GetDB()
	db.AutoMigrate(&models.User{})
}
