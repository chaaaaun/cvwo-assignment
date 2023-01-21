package dataaccess

import (
	"math"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
)

// Retrieves an array of comments based on offset
func DbListComments(page int, threadId uint64) (*[]models.Comment, int, error) {
	var comments []models.Comment
	// Get 10 entries with page offset
	offset := (page - 1) * 10
	selection := []string{"id", "created_at", "updated_at", "content", "user_id"}
	database.DB.Limit(10).Offset(offset).Select(selection).Order("created_at asc").Find(&comments, "thread_id = ?", threadId)

	// Get total comment count
	var count int64
	database.DB.Model(&models.Comment{}).Where("thread_id", threadId).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	return &comments, int(totalPages), nil
}

// Retreives comment by ID
func DbGetComment(id int) (*models.Comment, error) {
	var comment models.Comment
	if result := database.DB.First(&comment, id); result.Error != nil {
		return nil, result.Error
	}
	return &comment, nil
}

// Create comment using request payload
func DbCreateComment(newCommentData *api.CommentRequest, threadId uint, user string) error {
	comment := &models.Comment{
		Content:  newCommentData.Content,
		ThreadID: threadId,
		UserID:   user,
	}
	if result := database.DB.Create(&comment); result.Error != nil {
		return result.Error
	}
	return nil
}

func DbUpdateComment(newCommentData *api.CommentRequest, comment *models.Comment) error {
	if result := database.DB.Model(&comment).Updates(newCommentData); result.Error != nil {
		return result.Error
	}
	return nil
}

func DbDeleteComment(comment *models.Comment) error {
	if result := database.DB.Delete(&comment); result.Error != nil {
		return result.Error
	}
	return nil
}
