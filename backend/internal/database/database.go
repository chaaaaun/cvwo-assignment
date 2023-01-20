package database

import (
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func GetDB() (*gorm.DB, error) {
	dsn := os.Getenv("DB_STR")
	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}
