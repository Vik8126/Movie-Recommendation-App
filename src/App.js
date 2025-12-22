import { useState } from "react";

function App() {
  const [preference, setPreference] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitPreference = async () => {
    if (!preference.trim()) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        "https://movie-recommendation-backend-gkcq.onrender.com/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ preference }),
        }
      );

      const data = await response.json();
      setMovies(data.recommendations || []);
    } catch (err) {
      setError("Failed to fetch recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h2>🎬 Movie Recommendation App</h2>

      <input
        type="text"
        placeholder="Enter movie preference..."
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        style={{ width: 320, padding: 8 }}
      />

      <br />
      <br />

      <button onClick={submitPreference}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {movies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
