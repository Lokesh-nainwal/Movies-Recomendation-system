import { useState } from "react";
import { recommendMovie, getMoviePoster } from "./api";

function App() {
  // state for input movie name
  const [movie, setMovie] = useState("");

  // list of recommended movies (objects: { title, poster })
  const [list, setList] = useState([]);

  // loading indicator
  const [loading, setLoading] = useState(false);

  // function called when user clicks "Recommend"
  const handleRecommend = async () => {
    if (!movie) return;

    setLoading(true);

    // get recommended movie names from backend
    const names = await recommendMovie(movie);

    // for each movie name, fetch poster
    const moviesWithPosters = await Promise.all(
      names.map(async (name) => {
        const poster = await getMoviePoster(name);
        return { title: name, poster };
      })
    );

    setList(moviesWithPosters);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        color: "#fff",
        padding: "40px",
      }}
    >
      {/* ================= HEADER ================= */}
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        🎬 Movie Recommendation System
      </h1>

      {/* ================= SEARCH BAR ================= */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="Enter movie name (e.g. Avatar)"
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <button
          onClick={handleRecommend}
          style={{
            padding: "12px 20px",
            backgroundColor: "#e50914",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Recommend
        </button>
      </div>

      {/* ================= LOADING TEXT ================= */}
      {loading && <p>Loading recommendations...</p>}

      {/* ================= RECOMMENDED MOVIES GRID ================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {list.map((m, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#111",
              padding: "15px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            {/* Poster placeholder (image may be blocked by network) */}
            <div
              style={{
                height: "250px",
                backgroundColor: "#222",
                marginBottom: "10px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                color: "#aaa",
              }}
            >
              Poster
            </div>

            <p>{m.title}</p>
          </div>
        ))}
      </div>

      {/* ================= ABOUT / HOW IT WORKS SECTION ================= */}
      <div
        style={{
          marginTop: "80px",
          padding: "40px",
          backgroundColor: "#0f0f0f",
          borderRadius: "16px",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
          How This Recommendation System Works
        </h2>

        <p style={{ color: "#bbb", maxWidth: "900px", lineHeight: "1.7" }}>
          This project is a content-based movie recommendation system. Instead
          of using user ratings, it recommends movies by analyzing the content
          and metadata of films such as genres and descriptions.
        </p>

        {/* explanation cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={aboutCard}>
            🎭 <b>Content-Based Filtering</b>
            <p style={aboutText}>
              The system finds movies that are similar in genre and storyline to
              the selected movie.
            </p>
          </div>

          <div style={aboutCard}>
            📐 <b>Vector Similarity</b>
            <p style={aboutText}>
              Movie data is converted into vectors and compared using cosine
              similarity.
            </p>
          </div>

          <div style={aboutCard}>
            ⚙️ <b>FastAPI Backend</b>
            <p style={aboutText}>
              A Python FastAPI backend processes requests and returns
              recommendations efficiently.
            </p>
          </div>

          <div style={aboutCard}>
            🖥️ <b>React Frontend</b>
            <p style={aboutText}>
              A modern React frontend provides real-time recommendations with a
              clean and responsive UI.
            </p>
          </div>
        </div>
      </div>
      
    </div>

    
  );
}

/* ================= ABOUT SECTION STYLES ================= */



const aboutCard = {
  backgroundColor: "#111",
  padding: "20px",
  borderRadius: "12px",
};

const aboutText = {
  color: "#aaa",
  marginTop: "10px",
  fontSize: "14px",
};

export default App;
