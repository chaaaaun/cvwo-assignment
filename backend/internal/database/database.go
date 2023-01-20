package database

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Reusable EDb connection
var DB *gorm.DB

func GetDB() error {
	var err error
	// Opens the connection
	dsn := os.Getenv("DB_STR")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		return err
	}

	// Sets max pool based on free tier connections
	sqlDB, err := DB.DB()
	sqlDB.SetMaxOpenConns(4)

	return nil
}
