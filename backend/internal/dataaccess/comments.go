package dataaccess

import (
	"math"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

func DbListComments(page int, threadId uint64) (*[]models.Comment, int, error) {
	// println(threadId)
	var comments []models.Comment
	// Get 10 entries with page offset
	offset := (page - 1) * 10
	// Get only necessary info
	selection := []string{"id", "created_at", "updated_at", "content", "user_id"}
	database.DB.Limit(10).Offset(offset).Select(selection).Order("created_at asc").Find(&comments, "thread_id = ?", threadId)
	// Get total comment count
	var count int64
	database.DB.Model(&models.Comment{}).Where("thread_id", threadId).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	return &comments, int(totalPages), nil
}

func DbCreateComment(commentData *api.CommentRequest, threadId uint, user string) error {
	var comment = &models.Comment{
		Content:  commentData.Content,
		ThreadID: threadId,
		UserID:   user,
	}

	if result := database.DB.Create(&comment); result.Error != nil {
		return result.Error
	}

	return nil
}
