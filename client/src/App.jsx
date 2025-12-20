import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";


// ⚠️ Comment this out if Favorites.jsx doesn't exist yet
// import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/movies" element={<SearchMovies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Uncomment ONLY when Favorites page exists */}
        {/* <Route path="/favorites" element={<Favorites />} /> */}
      </Routes>
    </>
  );
}

export default App;
