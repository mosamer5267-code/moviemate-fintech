import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchMovies from "./pages/SearchMovies";
import MovieDetails from "./pages/MovieDetails";
import Recommendations from "./pages/Recommendations";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
