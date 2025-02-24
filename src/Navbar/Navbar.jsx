import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!user);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  const handleMyPosts = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(false);
      navigate(`/posts/${loggedInUser.id}`);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">CRUD APP</h2>
      <div className="navbar-links" ref={dropdownRef}>
        <Link to="/" className="nav-link">
          All Posts
        </Link>
        <div className="dropdown">
          <button
            className="dropdown-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isLoggedIn ? "Menu" : "Account"} ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={handleMyPosts} className="dropdown-item">
                    Add Posts
                  </button>
                  <button onClick={logoutUser} className="dropdown-item">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
