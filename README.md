# Free2top

Training project made in Lab4Tech

## Initialization

    docker compose -f ./compose.migration.yaml up --build

## Run in Docker (dev mode)

Run the project with Hot reloading

    docker compose up --build --watch

## Migrations

This command generates a migration file in the src/migration directory:

    cd ./restApi
    typeorm migration:create ./src/migration/users

Edit the generated migration file to define the SQL query and run the migration:

    docker compose -f ./compose.migration.yaml up --build

## Environment for node.js/npm on Windows

    fnm env --use-on-cd | Out-String | Invoke-Expression

## Run in Docker (productin mode)

    docker compose -f ./compose.production.yaml up --build
