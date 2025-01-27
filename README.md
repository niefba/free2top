# Free2top

Training project made in Lab4Tech

## Run in Docker (dev mode including migration)

Run the project with Hot reloading

    docker compose up --build --watch

## Migrations

This command generates a migration file in the src/migration directory:

    cd ./restApi
    typeorm migration:create ./src/migration/users

Edit the generated migration file to define the SQL query and run the migration (or re-run dev or production mode):

    docker compose -f ./compose.migration.yaml up --build

## Environment for node.js/npm on Windows

    fnm env --use-on-cd | Out-String | Invoke-Expression

## Run in Docker (productin mode including migration)

    docker compose -f ./compose.production.yaml up --build
