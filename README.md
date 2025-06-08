# InOrbit - Goal Tracking API

A simple API for tracking personal goals and habits built with Fastify, TypeScript, and PostgreSQL with Drizzle ORM.

## Tech Stack

- **Backend**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Date Handling**: Day.js

## Features

- Create and track personal goals
- Set weekly frequency targets for each goal
- Track goal completions
- View pending goals for the current week
- Prevent exceeding weekly completion limits

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database
- Docker (optional, for running PostgreSQL)

### Installation

1. Clone the repository
```bash
git clone https://github.com/pavwos/inorbit.git
cd inorbit/server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create a .env file with the following content
DATABASE_URL="postgresql://username:password@localhost:5432/inorbit"
```

4. Start the database (if using Docker)
```bash
docker-compose up -d
```

5. Run migrations
```bash
npx drizzle-kit push:pg
```

6. Seed the database (optional)
```bash
npm run seed
```

7. Run the development server
```bash
npm run dev
```

## API Endpoints

### Get Pending Goals
- **GET** `/pending-goals`
- **Response**:
  ```json
  {
    "pendingGoals": [
      {
        "id": "goal_id",
        "title": "Exercise",
        "desiredWeeklyFrequency": 3,
        "completionCount": 1
      }
    ]
  }
  ```

### Create a Goal
- **POST** `/goals`
- **Body**:
  ```json
  {
    "title": "Exercise",
    "desiredWeeklyFrequency": 3
  }
  ```

### Record Goal Completion
- **POST** `/completions`
- **Body**:
  ```json
  {
    "goalId": "goal_id"
  }
  ```
- **Note**: Will throw an error if the goal has already been completed the desired number of times for the current week

## Database Schema

### Goals Table
- `id`: Primary key (CUID)
- `title`: Goal title
- `desiredWeeklyFrequency`: Number of times per week the goal should be completed
- `createdAt`: Timestamp when the goal was created

### Goal Completions Table
- `id`: Primary key (CUID)
- `goalId`: Foreign key referencing the goal
- `createdAt`: Timestamp when the completion was recorded

## Database Management

### View Database with Drizzle Studio
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/inorbit" npx drizzle-kit studio
```

### Generate Migrations
```bash
npx drizzle-kit generate:pg
```

### Apply Migrations
```bash
npx drizzle-kit push:pg
```

## Project Structure

- `src/db/schema.ts` - Database schema definitions
- `src/db/index.ts` - Database connection setup
- `src/functions/` - Business logic functions
  - `create-goals.ts` - Create new goals
  - `create-goal-completion.ts` - Record goal completions
  - `get-week-pending-goals.ts` - Get goals pending for the current week
- `src/http/server.ts` - API server setup and route definitions
- `drizzle.config.ts` - Drizzle ORM configuration

## Development Scripts

- `npm run dev` - Start the development server with auto-reload
- `npm run seed` - Seed the database with initial data

## License

MIT