package dataaccess

import (
	"math"

	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbListComments(page int) (*[]models.Comment, int, error) {
	var comments []models.Comment
	// Get 10 entries with page offset
	offset := (page - 1) * 10
	// Get only necessary info
	selection := []string{"id", "created_at", "updated_at", "content", "likes", "user_id"}
	database.DB.Limit(10).Offset(offset).Select(selection).Order("created_at asc").Find(&comments)

	// Get total comment count
	var count int64
	database.DB.Model(&models.Comment{}).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	return &comments, int(totalPages), nil
}
