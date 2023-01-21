package models

import (
	"encoding/json"
	"strconv"

	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Content  string
	ThreadID uint
	UserID   string
}

// Marshals id field which is a uint to string for easier handling in frontend
func (comment *Comment) MarshalJSON() ([]byte, error) {
	type Alias Comment
	return json.Marshal(&struct {
		ID       string `json:"ID"`
		ThreadID string `json:"ThreadID"`
		*Alias
	}{
		ID:       strconv.FormatUint(uint64(comment.ID), 10),
		ThreadID: strconv.FormatUint(uint64(comment.ThreadID), 10),
		Alias:    (*Alias)(comment),
	})
}

type CommentContextKey struct{}
