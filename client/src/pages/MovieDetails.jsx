import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleRate = async () => {
    try {
      await api.post(`/movies/${id}/rate`, {
        rating: Number(rating),
      });

      const updated = await api.get(`/movies/${id}`);
      setMovie(updated.data);
      setMessage("Rating submitted ✅");
    } catch (err) {
      console.error(err);
      setMessage("You must be logged in to rate");
    }
  };

  const addToFavorites = async () => {
    try {
      await api.post(`/favorites/${id}`);
      setMessage("Added to favorites ❤️");
    } catch (err) {
      console.error(err);
      setMessage("You must be logged in to add favorites");
    }
  };

  if (loading) return <p>Loading movie...</p>;
  if (!movie) return <p>Movie not found</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      <p>
        ⭐ Average Rating:{" "}
        {movie.averageRating
          ? movie.averageRating.toFixed(1)
          : "Not rated yet"}
      </p>

      <div style={{ marginTop: "20px" }}>
        <h3>Rate this movie</h3>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button onClick={handleRate} style={{ marginLeft: "10px" }}>
          Submit Rating
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={addToFavorites}>Add to Favorites ❤️</button>
      </div>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

export default MovieDetails;
