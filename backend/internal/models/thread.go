package models

import "gorm.io/gorm"

type Thread struct {
	gorm.Model
	Title    string
	Content  string
	Views    int
	Likes    int
	Tags     string
	Comments []Comment
	UserID   string
}
