import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <span>
        Welcome, <b>{user.name}</b> ({user.role})
      </span>

      <span style={{ float: "right" }}>
        {user.role === "admin" && (
          <Link to="/admin" style={{ marginRight: "10px" }}>
            Admin
          </Link>
        )}

        <Link to="/dashboard" style={{ marginRight: "10px" }}>
          Dashboard
        </Link>

        <Link to="/profile" style={{ marginRight: "10px" }}>
          Profile
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </span>
    </nav>
  );
}

export default Navbar;
