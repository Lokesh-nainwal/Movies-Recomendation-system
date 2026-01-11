from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import pickle
import requests

# ---------------- FASTAPI SETUP ----------------
app = FastAPI(title="Movie Recommendation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (frontend access)
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ENVIRONMENT VARIABLES ----------------
MOVIES_URL = os.getenv("MOVIES_PKL_URL")
SIMILARITY_URL = os.getenv("SIMILARITY_PKL_URL")

if not MOVIES_URL or not SIMILARITY_URL:
    raise RuntimeError(
        "Model URLs not found! "
        "Be sure to set MOVIES_PKL_URL and SIMILARITY_PKL_URL in environment."
    )

# ---------------- LOCAL PATHS ----------------
BASE_DIR = os.path.dirname(__file__)
MOVIES_PATH = os.path.join(BASE_DIR, "movies.pkl")
SIMILARITY_PATH = os.path.join(BASE_DIR, "similarity.pkl")

# ---------------- DOWNLOAD HELPERS ----------------
def download_file(url: str, path: str):
    if not os.path.exists(path):
        print(f"Downloading {os.path.basename(path)}...")
        response = requests.get(url, timeout=60)
        response.raise_for_status()
        with open(path, "wb") as f:
            f.write(response.content)
        print(f"{os.path.basename(path)} saved.")

# Attempt to download the models if not present
download_file(MOVIES_URL, MOVIES_PATH)
download_file(SIMILARITY_URL, SIMILARITY_PATH)

# ---------------- LOAD MODELS ----------------
with open(MOVIES_PATH, "rb") as f:
    movies = pickle.load(f)

with open(SIMILARITY_PATH, "rb") as f:
    similarity = pickle.load(f)

# ---------------- REQUEST SCHEMA ----------------
class MovieRequest(BaseModel):
    movie: str

# ---------------- ROUTES ----------------
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
