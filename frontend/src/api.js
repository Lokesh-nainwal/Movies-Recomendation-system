import axios from "axios";

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const recommendMovie = async (movie) => {
  const res = await axios.post(
    "http://127.0.0.1:8000/recommend",
    { movie }
  );
  return res.data.recommendations;
};

export const getMoviePoster = async (title) => {
  // 1. Search movie
  const searchRes = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: TMDB_KEY,
        query: title
      }
    }
  );

  const movie = searchRes.data.results[0];
  if (!movie || !movie.poster_path) return null;

  // 2. Build poster URL
  return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
};
