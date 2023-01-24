# Sakura: Backend

Built with Go, with helper libraries like `go-chi` and `gorm`

## Available Scripts

### `go mod download`

Installs all necessary dependencies.

### `go run ./cmd/server/main.go`

Runs the app after building.\
Send queries to [http://localhost:8000](http://localhost:8000) to view responses.
You may want to use your favourite file watcher library (like `CompileDaemon`).

### `go build ./cmd/server/main.go`

Builds the app for production to the `../backend/dist` folder