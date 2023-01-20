package dataaccess

import (
	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbGetThread(id int) (*models.Thread, error) {
	var thread models.Thread
	database.DB.First(&thread)
	return &thread, nil
}

func DbCreateThread(threadData *api.ThreadRequest, user string) error {
	var thread = &models.Thread{
		Title:   threadData.Title,
		Content: threadData.Content,
		Tags:    threadData.Tags,
		Likes:   0,
		Views:   0,
		UserID:  user,
	}
	result := database.DB.Create(&thread)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
