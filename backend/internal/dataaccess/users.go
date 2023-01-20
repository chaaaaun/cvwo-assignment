package dataaccess

import (
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbCreateUser(user *models.User) error {
	result := database.DB.Create(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func DbReadUser(user *models.User) (*models.User, error) {
	database.DB.First(&user, "username = ?", user.Username)
	return user, nil
}
