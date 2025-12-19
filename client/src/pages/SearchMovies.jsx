import { movies } from "../data/movies";

function SearchMovies() {
  return (
    <div>
      <h1>Search Movies</h1>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> — {movie.genres.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchMovies;
