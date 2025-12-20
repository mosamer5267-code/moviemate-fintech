import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import SimilarMovies from "../components/SimilarMovies";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch movie
  useEffect(() => {
    async function fetchMovie() {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    }
    fetchMovie();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      const res = await api.get(`/movies/${id}/comments`);
      setComments(res.data);
    }
    fetchComments();
  }, [id]);

  // Rate movie
  async function submitRating() {
    await api.post(`/movies/${id}/rate`, { rating });
    alert("Rating submitted");
  }

  // Add / Remove favorite
  async function toggleFavorite() {
    if (isFavorite) {
      await api.delete(`/favorites/${id}`);
      setIsFavorite(false);
    } else {
      await api.post(`/favorites/${id}`);
      setIsFavorite(true);
    }
  }

  // Submit comment
  async function submitComment() {
    const res = await api.post(`/movies/${id}/comments`, {
      text: comment,
    });
    setComments([...comments, res.data]);
    setComment("");
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      <div className="tags">
        {movie.genres.map((g) => (
          <span key={g} className="tag">{g}</span>
        ))}
      </div>

      {/* ⭐ RATING */}
      <div className="section">
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Rate movie</option>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button onClick={submitRating}>Submit Rating</button>
      </div>

      {/* ❤️ FAVORITE */}
      <div className="section">
        <button onClick={toggleFavorite} className="favorite-btn">
          {isFavorite ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
        </button>
      </div>

      {/* 💬 COMMENTS */}
      <div className="section">
        <h3>Comments</h3>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />

        <button onClick={submitComment}>Post Comment</button>

        <ul className="comments">
          {comments.map((c, i) => (
            <li key={i}>{c.text}</li>
          ))}
        </ul>
      </div>

      {/* 🔁 SIMILAR MOVIES */}
      <SimilarMovies movieId={id} genres={movie.genres} />
    </div>
  );
}

export default MovieDetails;
