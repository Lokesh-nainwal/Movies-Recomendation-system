from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import pickle
import requests

# -------------------- FASTAPI APP --------------------
app = FastAPI(title="Movie Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend access
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- LOAD ENV VARIABLES --------------------
MOVIES_URL = os.getenv("MOVIES_PKL_URL")
SIMILARITY_URL = os.getenv("SIMILARITY_PKL_URL")

if not MOVIES_URL or not SIMILARITY_URL:
    raise RuntimeError(
        "Model URLs not found. Set MOVIES_PKL_URL and SIMILARITY_PKL_URL"
    )

# -------------------- DOWNLOAD MODELS IF NOT PRESENT --------------------
def download_file(url: str, filename: str):
    if not os.path.exists(filename):
        print(f"Downloading {filename}...")
        response = requests.get(url)
        response.raise_for_status()
        with open(filename, "wb") as f:
            f.write(response.content)
        print(f"{filename} downloaded")

download_file(MOVIES_URL, "movies.pkl")
download_file(SIMILARITY_URL, "similarity.pkl")

# -------------------- LOAD MODELS --------------------
movies = pickle.load(open("movies.pkl", "rb"))
similarity = pickle.load(open("similarity.pkl", "rb"))

# -------------------- REQUEST SCHEMA --------------------
class MovieRequest(BaseModel):
    movie: str

# -------------------- ROUTES --------------------
@app.get("/")
def home():
    return {"message": "Movie Recommendation API is running"}

@app.post("/recommend")
def recommend_movie(data: MovieRequest):
    movie_name = data.movie

    if movie_name not in movies["title"].values:
        return {"recommendations": []}

    index = movies[movies["title"] == movie_name].index[0]
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
