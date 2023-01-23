package dataaccess

import (
	"errors"
	"fmt"
	"math"

	"github.com/chauuun/cvwo-assignment/backend/internal/api"
	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/models"
	"gorm.io/gorm"
)

// Retreives thread by ID
func DbGetThread(id int) (*models.Thread, error) {
	var thread models.Thread
	database.DB.First(&thread, id)
	database.DB.Model(&thread).Update("views", gorm.Expr("views + ?", 1))
	return &thread, nil
}

func DbListThreads(page int) (*[]models.Thread, int, error) {
	var threads []models.Thread
	// Get 10 entries with page offset
	offset := (page - 1) * 10

	// Get total thread count
	var count int64
	database.DB.Model(&models.Thread{}).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	if int(totalPages) == 0 {
		return &[]models.Thread{}, int(totalPages), nil
	} else if page > int(totalPages) {
		return nil, 0, errors.New("page out of range")
	}

	// Get only necessary info
	selection := []string{"id", "created_at", "updated_at", "title", "views", "tags", "user_id"}
	database.DB.Limit(10).Offset(offset).Select(selection).Order("updated_at desc").Find(&threads)

	return &threads, int(totalPages), nil
}

func DbFilterThreads(page int, filters map[string]string, order string) (*[]models.Thread, int, error) {
	var threads []models.Thread
	// Get 10 entries with page offset
	offset := (page - 1) * 10
	selection := []string{"id", "created_at", "updated_at", "title", "views", "tags", "user_id"}
	chain := database.DB.Limit(10).Offset(offset).Select(selection).Order(order)

	if query, exists := filters["query"]; exists {
		chain.Where("title LIKE ?", fmt.Sprintf("%%%s%%", query))
	}
	if tags, exists := filters["tags"]; exists {
		chain.Where("tags LIKE ?", fmt.Sprintf("%%%s%%", tags))
	}
	if user, exists := filters["user"]; exists {
		chain.Where("user_id = ?", user)
	}

	// Preserve preceding queries for use after Count()
	chain.Session(&gorm.Session{})

	// Get total thread count
	var count int64
	chain.Model(&models.Thread{}).Count(&count)
	totalPages := math.Ceil(float64(count) / float64(10))

	if int(totalPages) == 0 {
		return &[]models.Thread{}, int(totalPages), nil
	} else if page > int(totalPages) {
		return nil, 0, errors.New("page out of range")
	}

	chain.Find(&threads)

	return &threads, int(totalPages), nil
}

func DbCreateThread(threadData *api.ThreadRequest, user string) error {
	var thread = &models.Thread{
		Title:   threadData.Title,
		Content: threadData.Content,
		Tags:    threadData.Tags,
		Views:   0,
		UserID:  user,
	}

	if result := database.DB.Create(&thread); result.Error != nil {
		return result.Error
	}

	return nil
}

func DbUpdateThread(thread *models.Thread) error {
	if result := database.DB.Save(&thread); result.Error != nil {
		return result.Error
	}
	return nil
}

func DbDeleteThread(thread *models.Thread) error {
	if result := database.DB.Delete(&thread); result.Error != nil {
		return result.Error
	}
	return nil
}
