import { Routes, Route, Navigate } from "react-router-dom";

import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Favorites from "./pages/Favorites";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/search" replace />} />

      <Route path="/search" element={<SearchMovies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
