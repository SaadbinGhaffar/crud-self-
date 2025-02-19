import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">CRUD APP</h2>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          All Posts
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
