import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware


from database import Base, engine, SessionLocal, MovieQuery

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(title="Movie Recommendation API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


Base.metadata.create_all(bind=engine)


class MovieRequest(BaseModel):
    preference: str


@app.get("/")
def root():
    return {"message": "Backend with DB and OpenAI is running"}



@app.post("/recommend")
def recommend_movies(request: MovieRequest):
    try:
        prompt = (
            "Recommend 3 to 5 movies based on the following preference.\n"
            "Return ONLY movie names, one per line.\n\n"
            f"Preference: {request.preference}"
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        movies_text = response.choices[0].message.content.strip()

        movies = [
            m.strip("-• ")
            for m in movies_text.split("\n")
            if m.strip()
        ]

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
