import { useState } from "react";
import { recommendMovie } from "./api";

function App() {
  const [movie, setMovie] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!movie) return;

    setLoading(true);
    const names = await recommendMovie(movie);
    setList(names);
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

      {/* ================= SEARCH ================= */}
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

      {loading && <p>Loading recommendations...</p>}

      {/* ================= MOVIES GRID ================= */}
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
            <div
              style={{
                height: "250px",
                backgroundColor: "#222",
                marginBottom: "10px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#aaa",
              }}
            >
              Poster
            </div>

            <p>{m}</p>
          </div>
        ))}
      </div>

      {/* ================= ABOUT SECTION ================= */}
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
          This is a content-based movie recommendation system that suggests
          movies similar to the one selected by the user using cosine
          similarity.
        </p>

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
              Recommendations are based on movie genres and descriptions.
            </p>
          </div>

          <div style={aboutCard}>
            📐 <b>Cosine Similarity</b>
            <p style={aboutText}>
              Movies are compared using vector similarity techniques.
            </p>
          </div>

          <div style={aboutCard}>
            ⚙️ <b>FastAPI Backend</b>
            <p style={aboutText}>
              The backend handles ML logic and serves recommendations via API.
            </p>
          </div>

          <div style={aboutCard}>
            🖥️ <b>React Frontend</b>
            <p style={aboutText}>
              A responsive UI that communicates with the backend in real time.
            </p>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          marginTop: "80px",
          padding: "30px 20px",
          backgroundColor: "#0a0a0a",
          textAlign: "center",
          borderTop: "1px solid #222",
        }}
      >
        <p style={{ color: "#888", marginBottom: "8px" }}>
          Created by <b style={{ color: "#fff" }}>Lokesh Nainwal</b>
        </p>

        <p style={{ color: "#888", marginBottom: "8px" }}>
          📧 Email:{" "}
          <a
            href="mailto:yourmail@gmail.com"
            style={{ color: "#e50914", textDecoration: "none" }}
          >
            lokeshnainwal57@gmail.com
          </a>
        </p>

        <p>
          🔗{" "}
          <a
            href="https://github.com/Lokesh-nainwal"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#e50914", textDecoration: "none" }}
          >
            GitHub Profile
          </a>
        </p>

        <p style={{ color: "#555", fontSize: "12px", marginTop: "15px" }}>
          © {new Date().getFullYear()} Movie Recommendation System
        </p>
      </footer>
    </div>
  );
}

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
