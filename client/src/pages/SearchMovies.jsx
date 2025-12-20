import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <strong>{movie.title}</strong>
              </Link>
              <p>{movie.description}</p>
              <p>
                ⭐ Average rating:{" "}
                {movie.averageRating
                  ? movie.averageRating.toFixed(1)
                  : "Not rated"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchMovies;
