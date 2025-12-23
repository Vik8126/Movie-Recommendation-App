# Movie Recommendation Web App

A full-stack web application that recommends movies based on user preferences using OpenAI.

## Tech Stack
- Frontend: React (Vite, JavaScript)
- Backend: Python (FastAPI)
- AI: OpenAI API
- Database: SQLite
- Deployment: Render

## Features
- User enters a genre or description
- AI returns 3–5 movie recommendations
- User input and recommendations stored in SQLite

##  How to Run the Application Locally


Follow the steps below to run both the backend and frontend on your local machine.

- Prerequisites

Make sure the following are installed on your system:

Node.js (v18+ recommended)

Python (v3.9 or above)

npm (comes with Node.js)

pip (comes with Python)


1. Backend Setup (FastAPI)

The backend handles API requests, talks to OpenAI, and stores data in SQLite.

Step 1: Navigate to the backend folder
cd backend

Step 2: Create a virtual environment
python -m venv venv


Activate it:

Windows

venv\Scripts\activate


Mac/Linux

source venv/bin/activate

Step 3: Install backend dependencies
pip install -r requirements.txt

Step 4: Create environment variables

Create a file named .env inside the backend folder and add:

OPENAI_API_KEY=your_openai_api_key_here


Step 5: Start the backend server
uvicorn main:app --reload


The backend will start at:

http://127.0.0.1:8000


You can open Swagger API documentation at:

http://127.0.0.1:8000/docs

2️. Frontend Setup (React + Vite)

Step 1: Go back to the project root
cd ..

Step 2: Install frontend dependencies
npm install

Step 3: Start the frontend development server
npm run dev


The frontend will be available at:

http://localhost:5173

3️. Using the Application

Open the frontend URL in your browser.

Enter a movie preference (for example:
“action movies with a strong female lead”).

Click Get Recommendations.

The app will display 3–5 AI-generated movie suggestions.

Each request is also saved in the SQLite database for reference.


### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
