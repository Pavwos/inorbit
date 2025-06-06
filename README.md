# InOrbit - Goal Tracking API

A simple API for tracking personal goals and habits built with Fastify, TypeScript, and PostgreSQL with Drizzle ORM.

## Tech Stack

- **Backend**: Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL database

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

4. Run the development server
```bash
npm run dev
```

## API Endpoints

### Create a Goal
- **POST** `/goals`
- **Body**:
  ```json
  {
    "title": "Exercise",
    "desiredWeeklyFrequency": 3
  }
  ```

## Database Management

### View Database with Drizzle Studio
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/inorbit" npx drizzle-kit studio
```

### Generate Migrations
```bash
npx drizzle-kit generate:pg
```

## Project Structure

- `src/db/schema.ts` - Database schema definitions
- `src/functions/` - Business logic functions
- `src/http/server.ts` - API server setup
- `drizzle.config.ts` - Drizzle ORM configuration

## License

MIT