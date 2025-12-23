# Movie Recommendation App

A full-stack AI-powered movie recommendation web app.

## Tech Stack
- Frontend: React (Vite)
- Backend: FastAPI (Python)
- AI: OpenAI API
- Database: SQLite
- Deployment: Vercel (Frontend), Render (Backend)

## Features
- Enter a movie preference (genre / description)
- AI returns 3–5 movie recommendations
- User queries stored in SQLite
- Clean, responsive UI

## ▶ Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
