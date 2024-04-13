# Reddit-Clone

This is a Reddit-Clone (a Boilerplate for my Future Project includes all the technologies I will use in my projects).

- Clone the repository: `git clone https://github.com/aniketmandloi/reddit-clone.git`
- Change the directory to Project: `cd reddit-clone`

## Server Side

### Node + GraphQL + Express and Apollo-server

This template provides a minimal setup to get Node.js working with Express and GraphQL.

#### Database Setup

- Install Postgres in your computer: [https://www.postgresql.org/download/](Postgres)
- Create a database: `createdb redditclone`
- Run the Migration: `npx mikro-orm migration:create`

#### Redis Setup

only if you want to see cookie saved on your local environment

- Install redis in your computer: [https://redis.io/download](Redis) or using brew: `brew install redis`
- Test redis installation: `redis-server`
- Start redis: `brew services start redis`
- After usage stop redis server: `brew services stop redis`

#### Run the server Locally

- Change the directory to server: `cd server`
- Install dependenciec: `npm install` or `npm i`
- Run the client: `npm run dev`
