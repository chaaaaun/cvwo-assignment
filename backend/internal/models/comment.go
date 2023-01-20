package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	Content  string
	Likes    int
	ThreadID uint
	UserID   string
}
