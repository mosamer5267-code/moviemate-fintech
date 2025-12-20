import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setFavorites(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  const removeFavorite = async (movieId) => {
    try {
      await api.delete(`/favorites/${movieId}`);
      setFavorites((prev) =>
        prev.filter((movie) => movie._id !== movieId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove favorite");
    }
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Favorites ❤️</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <li key={movie._id} style={{ marginBottom: "20px" }}>
              <Link to={`/movies/${movie._id}`}>
                <strong>{movie.title}</strong>
              </Link>

              <p>{movie.description}</p>

              <button
                onClick={() => removeFavorite(movie._id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  cursor: "pointer",
                }}
              >
                Remove ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;
