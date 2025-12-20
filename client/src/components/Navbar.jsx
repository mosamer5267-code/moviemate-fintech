import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        borderBottom: "1px solid #ddd",
        marginBottom: "20px",
      }}
    >
      <div>
        <Link to="/movies" style={{ marginRight: "15px" }}>
          Movies
        </Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      <div>
        {!token ? (
          <Link to="/login">
            <button>Login</button>
          </Link>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
