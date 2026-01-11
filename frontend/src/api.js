import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const recommendMovie = async (movie) => {
  const response = await axios.post(`${API_BASE_URL}/recommend`, {
    movie: movie,
  });
  return response.data.recommendations;
};
