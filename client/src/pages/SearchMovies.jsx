import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;

  return (
    <div>
      <h1>Movies</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie._id} style={{ marginBottom: "20px" }}>
            <Link to={`/movies/${movie._id}`}>
              <strong>{movie.title}</strong>
            </Link>
            <p>{movie.description}</p>
            <p>
              ⭐{" "}
              {movie.averageRating
                ? movie.averageRating.toFixed(1)
                : "Not rated"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovies;
