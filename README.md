# Chat Server

Backend API and real-time layer for a chat app: REST endpoints plus Socket.IO on the same HTTP server.

## Author

**Paul Ferreira** ([@jackalds](https://github.com/jackalds))

## Tech Stack

- Node.js (ES modules)
- Express 5
- MongoDB + Mongoose
- Socket.IO
- JWT (jsonwebtoken) + bcryptjs for auth
- TypeScript (source), run in dev with `tsx` / build to `dist` for production

## Prerequisites

- Node.js 18+ (recommended)
- npm 9+ (or compatible)
- MongoDB instance (local or Atlas) and connection string
- A `.env` file with required variables (see below)

---

## Backend Setup

### Environment variables

Create a `.env` in the project root (same folder as `package.json`):

| Variable     | Required | Description                                                         |
| ------------ | -------- | ------------------------------------------------------------------- |
| `MONGO_URI`  | Yes      | MongoDB connection string                                           |
| `JWT_SECRET` | Yes      | Secret used to sign JWTs                                            |
| `PORT`       | No       | HTTP port (default `3000`)                                          |
| `CLIENT_URL` | No       | Origin allowed for Socket.IO CORS (default `http://localhost:5173`) |

### Installation

1. `cd ts-chat-server` (or this repo’s root folder)
2. `npm i` to install dependencies

### Running locally

1. Ensure MongoDB is reachable and `MONGO_URI` / `JWT_SECRET` are set in `.env`
2. `npm run dev` to start the API + Socket.IO server with hot reload (`tsx` + `nodemon`)

REST routes are mounted under `/api/*` (for example `/api/auth`, `/api/users`, `/api/conversations`, `/api/messages`).

### Production-style run

1. Compile TypeScript to `dist`, for example: `npx tsc`
2. `npm start` runs `node dist/server.js` (requires that `dist/server.js` exists)

---

## Frontend Setup (optional)

Point your chat client at this server’s base URL (same host and port as `PORT`).

This project’s Socket.IO server allows the client origin from `CLIENT_URL` (defaults to `http://localhost:5173`).

Get the frontend from `https://github.com/jackalds/chat-client` (replace with your chat client repo or path).
