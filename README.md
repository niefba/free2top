# Free2top

Training project made in Lab4Tech

## Run in Docker 'dev' mode including migration

Run the project with Hot reloading

    docker compose up --build --watch

### Manage Migrations

This command generates a migration file in the src/migration directory:

    cd ./restApi
    typeorm migration:create ./src/migration/users

Edit the generated migration file to define the SQL query and run the migration (or re-run dev or production mode):

    docker compose -f ./compose.migration.yaml up --build

## Run in Docker 'production' mode including migration

    docker compose -f ./compose.production.yaml up --build

## Running in Docker 'test' with dedicated database

    # remove container and volume to start without any data
    docker rm db_free2top
    docker volume rm free2top-app_db-data-test

    # run test environment
    docker compose -f ./compose.test.yaml up --build

### Launch E2E testing with Playwright

    cd ./client
    npx playwright test

## Unit Testing with Jest
> Good to know: Since async Server Components are new to the React ecosystem, Jest currently does not support them.

### Launch Component Testing

    cd ./client
    npm test

## Tips

### Environment for node.js/npm commands on Windows

    fnm env --use-on-cd | Out-String | Invoke-Expression
