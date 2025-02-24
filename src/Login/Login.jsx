import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import TextInput from "../../components/Input/TextInput";
import Pagination from "../../components/Pagination/Pagination";
import Navbar from "../Navbar/Navbar";

const Login = ({ setLoggedin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [allPosts, setAllPosts] = useState([]); // Store all posts
  const [paginatedPosts, setPaginatedPosts] = useState([]); // Store current page posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle pagination
  useEffect(() => {
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    setPaginatedPosts(allPosts.slice(firstPostIndex, lastPostIndex));
  }, [currentPage, postsPerPage, allPosts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedin(user);
      navigate(`/`);
    } else {
      setError("Email or Password is incorrect");
    }
  };

  // Format the date as a readable string
  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  return (
    <div>
      <Navbar isLoggedIn={setLoggedin} />
      <div className="login-page">
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleLogin} className="login-form">
            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
            <div className="button-container">
              <PrimaryButton type="submit" className="login-btn">
                Login
              </PrimaryButton>
              <SecondaryButton
                onClick={() => navigate("/signup")}
                className="signup-btn"
              >
                Signup for First Time
              </SecondaryButton>
            </div>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        {/* <div className="posts-display">
          <h3>All Posts</h3>
          {loading ? (
            <p className="loading-text">Loading posts...</p>
          ) : (
            <div className="posts-list">
              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <div key={post.id} className="post-card">
                    <h4 className="post-title">{post.title}</h4>
                    <p className="post-body">{post.content || post.body}</p>
                    <div className="post-meta">
                      {post.createdAt && (
                        <p className="post-date">
                          {post.isLocal ? "Created: " : ""}
                          {formatDate(post.createdAt)}
                        </p>
                      )}
                      {post.updatedAt && (
                        <p className="post-date">
                          Updated: {formatDate(post.updatedAt)}
                        </p>
                      )}
                    </div>
                    {post.isLocal && <span className="local-badge">New</span>}
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
              <Pagination
                totalPosts={allPosts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Login;
