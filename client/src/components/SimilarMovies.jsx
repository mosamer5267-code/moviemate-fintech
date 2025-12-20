import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

/**
 * Shows similar movies based on shared genres.
 * Uses backend endpoint if you have it: GET /movies/:id/similar
 * If not available, it falls back to:
 *  - GET /movies
 *  - filters by shared genres (excluding current movie)
 */
export default function SimilarMovies({ movieId, genres = [] }) {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const genreSet = useMemo(() => new Set((genres || []).map((g) => g.toLowerCase())), [genres]);

  useEffect(() => {
    let mounted = true;

    async function fetchSimilar() {
      try {
        setLoading(true);

        // 1) Try backend endpoint first (if exists)
        try {
          const res = await api.get(`/movies/${movieId}/similar`);
          if (!mounted) return;
          setSimilar(res.data || []);
          return;
        } catch (e) {
          // If endpoint doesn't exist, fallback below
        }

        // 2) Fallback: fetch all movies and filter locally
        const allRes = await api.get("/movies");
        const allMovies = allRes.data || [];

        const filtered = allMovies
          .filter((m) => m?._id && m._id !== movieId)
          .map((m) => {
            const mGenres = (m.genres || []).map((g) => g.toLowerCase());
            const overlap = mGenres.filter((g) => genreSet.has(g)).length;
            return { ...m, _overlap: overlap };
          })
          .filter((m) => m._overlap > 0)
          .sort((a, b) => b._overlap - a._overlap)
          .slice(0, 6);

        if (!mounted) return;
        setSimilar(filtered);
      } catch (err) {
        if (!mounted) return;
        console.error("Failed to load similar movies:", err);
        setSimilar([]);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    if (!movieId) return;
    fetchSimilar();

    return () => {
      mounted = false;
    };
  }, [movieId, genreSet]);

  if (loading) {
    return (
      <div className="section">
        <h2 className="sectionTitle">Similar Movies</h2>
        <div className="muted">Loading similar movies…</div>
      </div>
    );
  }

  if (!similar.length) {
    return (
      <div className="section">
        <h2 className="sectionTitle">Similar Movies</h2>
        <div className="muted">No similar movies found.</div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2 className="sectionTitle">Similar Movies</h2>
      <div className="grid">
        {similar.map((m) => (
          <Link key={m._id} to={`/movies/${m._id}`} className="cardLink">
            <div className="card">
              <div className="cardHeader">
                <div className="cardTitle">{m.title}</div>
                {typeof m.averageRating === "number" && (
                  <div className="badge">
                    ⭐ {m.averageRating ? m.averageRating.toFixed(1) : "—"}
                  </div>
                )}
              </div>

              <div className="cardBody">
                <div className="cardDesc">
                  {(m.description || "").length > 120
                    ? `${m.description.slice(0, 120)}…`
                    : m.description || "No description."}
                </div>

                {!!(m.genres || []).length && (
                  <div className="chipRow">
                    {(m.genres || []).slice(0, 3).map((g, idx) => (
                      <span className="chip" key={`${m._id}-${idx}`}>
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
