import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <h2>Loading movie...</h2>;
  }

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  );
}

export default MovieDetails;
