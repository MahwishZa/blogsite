# Dev Ninja Blogsite

A Next.js 15 blog with authentication (NextAuth), MongoDB (Mongoose), dynamic posts and comments, image uploads, and a responsive dashboard.

## Prerequisites
- Node 18+
- MongoDB connection string

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local` in the project root:
```bash
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
NEXTAUTH_SECRET="<a-long-random-string>"
NEXTAUTH_URL="http://localhost:3000"
```
3. Run dev server:
```bash
npm run dev
```

## Features
- Auth: Credentials login with NextAuth; protected `/dashboard/*` via middleware
- Posts: CRUD via REST APIs backed by MongoDB
- Comments: Create/edit/delete comments on posts for authenticated users
- Images: Upload images to `public/uploads` via `/api/upload`
- UI: Responsive Dashboard, Create, Edit; category select options; session-aware navbar

## Key Endpoints
- Auth: `POST /api/auth/[...nextauth]` (NextAuth handler)
- Signup: `POST /api/auth/signup`
- Posts: `GET/POST /api/posts`, `GET/PATCH/DELETE /api/posts/:id`
- Comments: `GET/POST /api/posts/:id/comments`, `PATCH/DELETE /api/posts/:id/comments/:commentid`
- Upload: `POST /api/upload` (multipart/form-data, field: `file`)

## Project Structure
- `src/app` – App Router pages and API routes
- `src/models` – Mongoose models (`User`, `Post`, `Comment`)
- `src/lib` – DB and auth configuration
- `src/components` – UI components

## Usage
- Sign up at `/auth/signup`, then sign in at `/auth/signin`
- Create/edit posts at `/dashboard`
- Add comments on `/blog/[id]`

## Notes
- Uploaded images are stored locally under `public/uploads`. For production, switch to cloud storage (S3, Cloudinary, etc.).
- Ensure environment variables are set in hosting environment.
