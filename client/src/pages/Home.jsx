import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Home() {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return movies;
    return movies.filter((m) =>
      [m.title, m.description, ...(m.genres || [])]
        .join(" ")
        .toLowerCase()
        .includes(t)
    );
  }, [movies, q]);

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="h1">MovieMate</h1>
          <p className="p">
            Browse movies, rate them, and build your favorites.
          </p>
        </div>

        <div style={{ minWidth: 280, width: "min(420px, 100%)" }}>
          <input
            className="input"
            placeholder="Search by title, description, genre…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="spacer" />

      {loading ? (
        <div className="card">
          <div className="cardBody">Loading movies…</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="cardBody">No movies found.</div>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((movie) => (
            <Link key={movie._id} to={`/movies/${movie._id}`} className="card">
              <div className="cardBody">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <h2 className="h2" style={{ margin: 0 }}>
                    {movie.title}
                  </h2>
                  <span className="badge">
                    ⭐{" "}
                    {movie.averageRating
                      ? movie.averageRating.toFixed(1)
                      : "—"}
                  </span>
                </div>

                <div className="spacer" style={{ height: 10 }} />

                <p className="p">
                  {movie.description
                    ? movie.description.slice(0, 120) +
                      (movie.description.length > 120 ? "…" : "")
                    : "No description."}
                </p>

                {!!(movie.genres || []).length && (
                  <>
                    <div className="spacer" style={{ height: 12 }} />
                    <div className="row">
                      {movie.genres.slice(0, 3).map((g) => (
                        <span className="badge" key={g}>
                          {g}
                        </span>
                      ))}
                      {movie.genres.length > 3 && (
                        <span className="badge">+{movie.genres.length - 3}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
