# Streamer Tracker App

Streamer Tracker App is an app that allows you to find your streamer anywhere. You can use it to find your streamer, and join their community from one place.

# Project Setup and Usage

This guide will help you set up and run the application locally, either using Docker or by connecting to an external database. It also covers how to handle database migrations effectively.

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) (for local Docker setup)
- [Node.js](https://nodejs.org/) (for running the application locally)

## Getting Started

### 1. Create a `.env` File

At the root of the project, create a `.env` file based on the template provided in the [.env.example](.env.example) file. This file should contain all necessary environment variables, such as database credentials and application settings.

### 2. Running the Application

#### Option 1: Running with Docker

If you have Docker installed, you can quickly spin up the entire application, including the database, by running the following command in the root folder:

```bash
docker-compose up
```

Once Docker is up and running, you can access the application at the following URLs:

- **Database**: [localhost:5432](localhost:5432)
- **Next.js Application**: [localhost:3000](localhost:3000)
- **API**: [localhost:3000/api](localhost:3000/api)

> **Note:** The Docker setup automatically applies database migrations at startup.

#### Option 2: Running with an External Database

If you prefer to use an external database instead of running one locally:

1. Update your `.env` file with the appropriate connection details for the remote database.
2. Start the Next.js application locally with:

    ```bash
    npm run dev
    ```

The application will now connect to the specified remote database.

## Managing Database Migrations

### Updating the Database Schema

Whenever you update the database schema in [schema.ts](./src/server/db/schema.ts), follow these steps to ensure your database is up to date:

1. **Generate Migration Files**:

    Run the following command to generate migration files based on your schema changes:

    ```bash
    npm run db:generate
    ```

    This will update the [drizzle](./drizzle/) folder with the latest snapshot of the database schema.

2. **Apply Migrations**:

    For remote databases, apply the migrations by running:

    ```bash
    npm run db:migrate
    ```

    > **Note:** If you're using the Docker setup, migrations are applied automatically on startup.
