import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        setFavorites(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const removeFavorite = async (movieId) => {
    try {
      await api.delete(`/favorites/${movieId}`);
      setFavorites((prev) => prev.filter((m) => m._id !== movieId));
    } catch (e) {
      console.error(e);
      alert("Failed to remove favorite");
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="h1">Favorites</h1>
          <p className="p">Your saved movies in one place.</p>
        </div>
        <span className="badge">{favorites.length} saved</span>
      </div>

      <div className="spacer" />

      {loading ? (
        <div className="card">
          <div className="cardBody">Loading favorites…</div>
        </div>
      ) : favorites.length === 0 ? (
        <div className="card">
          <div className="cardBody">No favorites yet.</div>
        </div>
      ) : (
        <div className="grid">
          {favorites.map((m) => (
            <div key={m._id} className="card">
              <div className="cardBody">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <Link to={`/movies/${m._id}`} className="h2" style={{ margin: 0 }}>
                    {m.title}
                  </Link>
                  <button
                    className="btn btnDanger"
                    onClick={() => removeFavorite(m._id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="spacer" style={{ height: 10 }} />
                <p className="p">
                  {m.description
                    ? m.description.slice(0, 110) +
                      (m.description.length > 110 ? "…" : "")
                    : "No description."}
                </p>

                {!!(m.genres || []).length && (
                  <>
                    <div className="spacer" style={{ height: 12 }} />
                    <div className="row">
                      {m.genres.slice(0, 3).map((g) => (
                        <span className="badge" key={g}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
