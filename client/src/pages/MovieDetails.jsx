import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        const similarRes = await api.get(`/movies/${id}/similar`);
        setSimilar(similarRes.data);

        const commentsRes = await api.get(`/movies/${id}/comments`);
        setComments(commentsRes.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAll();
  }, [id]);

  const submitRating = async () => {
    if (!rating) return;
    await api.post(`/movies/${id}/rate`, { rating: Number(rating) });
    const updated = await api.get(`/movies/${id}`);
    setMovie(updated.data);
    setRating("");
  };

  const submitComment = async () => {
    if (!comment.trim()) return;
    const res = await api.post(`/movies/${id}/comments`, { text: comment });
    setComments((prev) => [...prev, res.data]);
    setComment("");
  };

  if (!movie) {
    return (
      <div className="container">
        <div className="card"><div className="cardBody">Loading…</div></div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* MOVIE INFO */}
      <div className="card">
        <div className="cardBody">
          <h1 className="h1">{movie.title}</h1>
          <p className="p">{movie.description}</p>

          <div className="spacer" />

          <div className="row">
            {(movie.genres || []).map((g) => (
              <span key={g} className="badge">{g}</span>
            ))}
            <span className="badge">
              ⭐ {movie.averageRating ? movie.averageRating.toFixed(1) : "—"}
            </span>
          </div>

          <div className="hr" />

          {/* RATE */}
          <div className="row">
            <select
              className="select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Rate movie</option>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button className="btn btnPrimary" onClick={submitRating}>
              Submit Rating
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR MOVIES */}
      {similar.length > 0 && (
        <>
          <div className="spacer" />
          <h2 className="h2">Similar Movies</h2>
          <div className="grid">
            {similar.map((m) => (
              <Link key={m._id} to={`/movies/${m._id}`} className="card">
                <div className="cardBody">
                  <h3 className="h2">{m.title}</h3>
                  <p className="p">
                    {m.description?.slice(0, 90)}…
                  </p>
                  <div className="spacer" style={{ height: 10 }} />
                  <div className="row">
                    {(m.genres || []).slice(0, 3).map((g) => (
                      <span key={g} className="badge">{g}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* COMMENTS */}
      <div className="spacer" />
      <h2 className="h2">Comments</h2>

      <div className="card">
        <div className="cardBody">
          <textarea
            className="textarea"
            placeholder="Write a comment…"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="spacer" style={{ height: 10 }} />
          <button className="btn btnPrimary" onClick={submitComment}>
            Post Comment
          </button>

          <div className="hr" />

          {comments.length === 0 ? (
            <p className="small">No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="toast">
                {c.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
