import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMovie();
    checkFavorite();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    } catch {
      setMessage("Failed to load movie");
    }
  };

  const checkFavorite = async () => {
    try {
      const res = await api.get("/favorites");
      const exists = res.data.some((m) => m._id === id);
      setIsFavorite(exists);
    } catch {
      // user not logged in → ignore
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await api.post(`/favorites/${id}`);
        setIsFavorite(true);
      }
    } catch {
      alert("Login required to favorite movies");
    }
  };

  const submitRating = async () => {
    try {
      await api.post(`/movies/${id}/rate`, { rating: Number(rating) });
      fetchMovie();
      setRating("");
    } catch {
      alert("Failed to submit rating");
    }
  };

  if (!movie) return null;

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p className="description">{movie.description}</p>

      <div className="tags">
        {movie.genres?.map((g) => (
          <span key={g} className="tag">{g}</span>
        ))}
      </div>

      <p className="rating">
        ⭐ {movie.averageRating.toFixed(1)} / 5
      </p>

      <button
        className={isFavorite ? "btn danger" : "btn primary"}
        onClick={toggleFavorite}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <div className="rate-box">
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Rate movie</option>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button className="btn primary" onClick={submitRating}>
          Submit Rating
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
