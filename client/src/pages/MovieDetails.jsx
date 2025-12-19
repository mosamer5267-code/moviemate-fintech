import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Layout from "../components/Layout";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    api.get(`/movies/${id}`).then((res) => setMovie(res.data));
    api.get(`/movies/${id}/similar`).then((res) => setSimilarMovies(res.data));
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      await api.post(`/favorites/${movie._id}`);
      alert("Added to favorites!");
    } catch {
      alert("You must be logged in");
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <Layout>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>

      <button onClick={handleAddFavorite}>❤️ Add to Favorites</button>

      <h3>Similar Movies</h3>
      <ul>
        {similarMovies.map((m) => (
          <li key={m._id}>{m.title}</li>
        ))}
      </ul>
    </Layout>
  );
}

export default MovieDetails;
