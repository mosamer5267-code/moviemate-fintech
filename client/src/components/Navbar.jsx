import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = ({ isActive }) => ({
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: isActive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.92)",
  });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(14px)",
        background: "rgba(11,15,25,0.65)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        className="container"
        style={{
          paddingTop: 12,
          paddingBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link to="/" className="row" style={{ gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(34,197,94,0.6))",
              boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
            }}
          />
          <div>
            <div style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
              MovieMate
            </div>
            <div className="small">Rate • Favorite • Discover</div>
          </div>
        </Link>

        <div className="row" style={{ gap: 8 }}>
          <NavLink to="/" style={linkStyle} end>
            Home
          </NavLink>

          <NavLink to="/favorites" style={linkStyle}>
            Favorites
          </NavLink>

          {!token ? (
            <button className="btn btnPrimary" onClick={() => navigate("/login")}>
              Login
            </button>
          ) : (
            <button className="btn btnDanger" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
