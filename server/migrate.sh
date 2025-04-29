#!/bin/bash

# Compile the project
echo "Compiling TypeScript..."
tsc

# Check for the first argument: create, up, or down
COMMAND=$1

if [ -z "$COMMAND" ]; then
  echo "Usage: ./migrate.sh [create|up|down]"
  exit 1
fi

# Run the appropriate MikroORM command
case $COMMAND in
  create)
    echo "Creating migration..."
    npx mikro-orm migration:create --config ./dist/db/mikro-orm.config.js
    ;;
  up)
    echo "Running migration up..."
    npx mikro-orm migration:up --config ./dist/db/mikro-orm.config.js
    ;;
  down)
    echo "Running migration down..."
    npx mikro-orm migration:down --config ./dist/db/mikro-orm.config.js
    ;;
  *)
    echo "Unknown command: $COMMAND"
    echo "Valid commands are: create, up, down"
    exit 1
    ;;
esac