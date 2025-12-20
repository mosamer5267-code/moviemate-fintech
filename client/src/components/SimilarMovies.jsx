import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function SimilarMovies({ movieId }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await api.get(`/movies/${movieId}/similar`);
        setMovies(res.data);
      } catch (err) {
        console.error("Failed to load similar movies");
      }
    };

    fetchSimilar();
  }, [movieId]);

  if (movies.length === 0) return null;

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Similar Movies 🎬</h3>

      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SimilarMovies;
