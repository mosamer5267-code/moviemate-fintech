import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo" />
        <div>
          <div className="brand">MovieMate</div>
          <div className="tagline">Rate • Favorite • Discover</div>
        </div>
      </div>

      <div className="nav-right">
        <Link className="nav-btn" to="/">Home</Link>
        <Link className="nav-btn" to="/favorites">Favorites</Link>
        <button
          className="nav-btn logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
