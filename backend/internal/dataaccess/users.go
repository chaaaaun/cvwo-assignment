package dataaccess

import (
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"gorm.io/gorm"
)

func DbCreateUser(db *gorm.DB, user *models.User) error {
	result := db.Create(&user)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
