import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const [similarMovies, setSimilarMovies] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // fetch movie, similar movies, comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        // similar movies (optional)
        try {
          const similarRes = await api.get(`/movies/${id}/similar`);
          setSimilarMovies(similarRes.data);
        } catch {}

        // comments
        try {
          const commentsRes = await api.get(`/movies/${id}/comments`);
          setComments(commentsRes.data);
        } catch {}
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  // ⭐ RATE MOVIE (NO LOGIN REQUIRED)
  const handleRate = async () => {
    if (!rating) return;

    try {
      await api.post(`/movies/${id}/rate`, {
        rating: Number(rating),
      });

      const updated = await api.get(`/movies/${id}`);
      setMovie(updated.data);
      setMessage("Rating submitted ✅");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  // ❤️ ADD TO FAVORITES (LOGIN REQUIRED – unchanged)
  const addToFavorites = async () => {
    try {
      await api.post(`/favorites/${id}`);
      setMessage("Added to favorites ❤️");
    } catch {
      setMessage("Login required to add favorites");
    }
  };

  // 💬 SUBMIT COMMENT (NO LOGIN REQUIRED)
  const submitComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/movies/${id}/comments`, {
        text: commentText,
      });

      // 👇 immediately show the new comment
      setComments((prev) => [...prev, res.data]);
      setCommentText("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit comment");
    }
  };

  if (!movie) return <p>Loading movie...</p>;

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

      {/* Rating */}
      <div style={{ marginTop: "15px" }}>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Rate this movie</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <button onClick={handleRate} style={{ marginLeft: "10px" }}>
          Submit
        </button>
      </div>

      {/* Favorites */}
      <div style={{ marginTop: "15px" }}>
        <button onClick={addToFavorites}>Add to Favorites ❤️</button>
      </div>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Similar Movies 🎬</h3>
          <ul>
            {similarMovies.map((m) => (
              <li key={m._id}>
                <Link to={`/movies/${m._id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comments */}
      <div style={{ marginTop: "30px" }}>
        <h3>Comments 💬</h3>

        {comments.length === 0 && <p>No comments yet.</p>}

        <ul>
          {comments.map((c) => (
            <li key={c._id}>
              {c.text}
            </li>
          ))}
        </ul>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <br />
        <button onClick={submitComment}>Post</button>
      </div>
    </div>
  );
}

export default MovieDetails;
