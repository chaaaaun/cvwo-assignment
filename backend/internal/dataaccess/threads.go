package dataaccess

import (
	"math"

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

func DbListThreads(page int) (*[]models.Thread, int, error) {
	var threads []models.Thread
	// Get 10 entries with page offset
	offset := (page - 1) * 10
	// Get only necessary info
	selection := []string{"id", "created_at", "updated_at", "title", "views", "likes", "tags", "user_id"}
	database.DB.Limit(10).Offset(offset).Select(selection).Order("updated_at desc").Find(&threads)

	// Get total thread count
	var count int64
	database.DB.Model(&models.Thread{}).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	return &threads, int(totalPages), nil
}
