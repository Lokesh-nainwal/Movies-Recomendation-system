from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model files
movies = pickle.load(open("movies.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))

class MovieRequest(BaseModel):
    movie: str

@app.get("/")
def home():
    return {"message": "Movie Recommendation API is running"}

@app.post("/recommend")
def recommend_movie(data: MovieRequest):
    movie = data.movie

    if movie not in movies["title"].values:
        return {"recommendations": []}

    index = movies[movies["title"] == movie].index[0]
    distances = similarity[index]

    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommendations = [
        movies.iloc[i[0]].title for i in movie_list
    ]

    return {"recommendations": recommendations}
