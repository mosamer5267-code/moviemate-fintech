import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <h2>Loading movies...</h2>;
  }

  return (
    <div>
      <h1>Search Movies</h1>

      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <strong>{movie.title}</strong>
            </Link>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovies;
