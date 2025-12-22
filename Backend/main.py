import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware


from database import Base, engine, SessionLocal, MovieQuery

# Load environment variables
load_dotenv()

# Initialize OpenAI client (NEW SDK)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="Movie Recommendation API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create DB tables on startup
Base.metadata.create_all(bind=engine)


# ----------- Request Schema -----------
class MovieRequest(BaseModel):
    preference: str


# ----------- Health Check -----------
@app.get("/")
def root():
    return {"message": "Backend with DB and OpenAI is running"}


# ----------- Test DB (optional) -----------
@app.get("/test-db")
def test_db():
    db = SessionLocal()
    entry = MovieQuery(
        user_input="test input",
        recommended_movies="test movie 1, test movie 2"
    )
    db.add(entry)
    db.commit()
    db.close()
    return {"status": "saved"}


# ----------- Movie Recommendation API -----------
@app.post("/recommend")
def recommend_movies(request: MovieRequest):
    try:
        prompt = (
            "Recommend 3 to 5 movies based on the following preference.\n"
            "Return ONLY movie names, one per line.\n\n"
            f"Preference: {request.preference}"
        )

        # OpenAI Chat Completion (NEW WAY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        movies_text = response.choices[0].message.content.strip()

        # Clean movie list
        movies = [
            m.strip("-• ")
            for m in movies_text.split("\n")
            if m.strip()
        ]

        # Save to database
        db = SessionLocal()
        entry = MovieQuery(
            user_input=request.preference,
            recommended_movies=", ".join(movies)
        )
        db.add(entry)
        db.commit()
        db.close()

        return {
            "user_input": request.preference,
            "recommendations": movies
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
