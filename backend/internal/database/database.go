package database

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Reusable DB connection
var DB *gorm.DB

func GetDB() error {
	var err error
	// Opens the connection
	dsn := os.Getenv("DB_STR")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		// Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		return err
	}

	// Sets max pool based on free tier connections
	sqlDB, _ := DB.DB()
	sqlDB.SetMaxOpenConns(4)

	return nil
}
