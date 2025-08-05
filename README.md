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

Defaults are provided in Docker Compose, but you can override:
DATABASE_URL=postgres://user:password@db:5432/uploads

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

### 📦 Project Structure

```
├── prisma/
├── src/
├── static/uploads/ # Uploaded files (local)
├── Dockerfile
├── docker-compose.yaml
└── ...
```
