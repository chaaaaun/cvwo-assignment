package models

import (
	"encoding/json"
	"strconv"

	"gorm.io/gorm"
)

type Thread struct {
	gorm.Model
	Title    string
	Content  string
	Views    int
	Tags     string
	Comments []Comment `json:"Comments,omitempty"`
	UserID   string

	// Read-only alias field for use when querying
	NumComments int `gorm:"->"`
}

// Marshals id field which is a uint to string for easier handling in frontend
func (thread *Thread) MarshalJSON() ([]byte, error) {
	type Alias Thread
	return json.Marshal(&struct {
		ID string `json:"ID"`
		*Alias
	}{
		ID:    strconv.FormatUint(uint64(thread.ID), 10),
		Alias: (*Alias)(thread),
	})
}

type ThreadContextKey struct{}
