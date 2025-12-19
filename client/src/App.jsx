import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/search">Search</Link> |{" "}
        <Link to="/favorites">Favorites</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
