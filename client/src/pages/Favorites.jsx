import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get("/favorites").then((res) => setFavorites(res.data));
  }, []);

  return (
    <Layout>
      <h1>My Favorites</h1>

      {favorites.length === 0 && <p>No favorites yet.</p>}

      <ul>
        {favorites.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> — Rating: {movie.rating}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default Favorites;
