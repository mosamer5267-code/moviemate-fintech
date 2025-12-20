import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";




function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load movies", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  return (
    <div>
      <h1 className="page-title">Discover Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link
              key={movie._id}
              to={`/movies/${movie._id}`}
              className="movie-card"
            >
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>

              <div className="movie-meta">
                <span>⭐ {movie.averageRating?.toFixed(1) || "—"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
