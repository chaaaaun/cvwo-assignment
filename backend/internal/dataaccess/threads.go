package dataaccess

import (
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbGetThread(id int) (*models.Thread, error) {
	var thread models.Thread
	database.DB.First(&thread)
	return &thread, nil
}

func DbCreateThread(thread *models.Thread) error {
	result := database.DB.Create(&thread)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
