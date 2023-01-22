package dataaccess

import (
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbCreateUser(user *models.User) error {
	if result := database.DB.Create(&user); result.Error != nil {
		return result.Error
	}
	return nil
}

func DbReadUser(user *models.User) (*models.User, error) {
	database.DB.First(&user, "id = ?", user.ID)
	return user, nil
}
