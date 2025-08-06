# 🗂️ Pack File Upload

A simple file upload and management app built with **SvelteKit**, **PostgreSQL**, and **Docker**.

---

## 🚀 Quick Start (with Docker)

### 1. Clone the repository

```bash
git clone https://github.com/Matteobikk90/pack-file-upload.git
cd pack-file-upload
```

### 2. Start the app & database

Set env example listed below with your own secrets

```bash
docker compose up --build
```

- The app will be available at http://localhost:4173
- PostgreSQL runs on port 5432 (internal, used by the app)

### 3. Usage

- Go to the app in your browser.
- Upload files and fill the form.
- Uploaded files are stored locally in static/uploads/ (or S3, if configured).

---

### ⚙️ Environment Variables

```
DATABASE_URL=postgres://user:password@db:5432/uploads
S3_REGION=your-region
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret
```

---

### 💡 Features

- Upload PDF, image, video, and other files
- Responsive table for uploaded resources
- Click a row to preview files (image, PDF, video)
- All requirements met for the assignment

---

### 🐳 Tech Stack

- Frontend/Backend: SvelteKit (TypeScript)
- Database: PostgreSQL
- ORM: Prisma
- DevOps: Docker, Docker Compose

---

🌐 Cloud Deployment (Vercel/S3/Neon)

- Deployed on Vercel for demo:
  https://pack-file-upload-gray.vercel.app/
- Uses AWS S3 for file storage (configure via .env)
- Uses Neon for Postgres database (cloud connection string in .env)

---

🛠️ Development

- pnpm dev — Start in dev mode (local only)
- pnpm db:s — Seed the database

---

❓ FAQ

- Why is my local DB empty after running Docker?
  You must seed it:
  docker compose exec app pnpm db:s
- How do I use my own S3/Neon credentials?
  Edit .env with your own cloud details.
- How do I reset/reseed the DB?
  Stop Docker, remove the volume, restart, and reseed.

---

### 📦 Project Structure

```
├── prisma/
├── src/
├── static/uploads/ # Uploaded files (local)
├── Dockerfile
├── docker-compose.yaml
└── ...
```
