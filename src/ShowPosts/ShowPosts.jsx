import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ShowPosts.css";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import TextInput from "../../components/Input/TextInput";
import Pagination from "../../components/Pagination/Pagination";
import Navbar from "../Navbar/Navbar";

const ShowPosts = () => {
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

  // Fetch posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Get posts from API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const apiPosts = await response.json();

        // Get user data to display usernames instead of just IDs
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Get any locally stored posts
        const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

        // Create a combined array with enhanced post info
        const combinedPosts = [
          ...apiPosts.map((post) => ({
            ...post,
            content: post.body,
            author:
              users.find((u) => u.id === post.userId)?.email ||
              `User ${post.userId}`,
            createdAt: post.createdAt || new Date(2023, 0, 1).toISOString(), // Default date for API posts
          })),
          ...localPosts.map((post) => ({
            ...post,
            content: post.body || post.content,
            author:
              users.find((u) => u.id === post.userId)?.email ||
              `User ${post.userId}`,
          })),
        ];

        // Sort by created date, newest first
        combinedPosts.sort(
          (a, b) =>
            new Date(b.createdAt || b.updatedAt || 0) -
            new Date(a.createdAt || a.updatedAt || 0)
        );

        setAllPosts(combinedPosts);
      } catch (err) {
        setError(`Failed to fetch posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Set up event listener for local storage changes
    const handleStorageChange = () => {
      fetchPosts();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
  // Format the date as a readable string
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comments = await response.json();

      const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const post = await postResponse.json();
      // Navigate with comments and postId
      navigate("/all-comments", { state: { comments, postId, post } });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="posts-display">
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
                    <div>
                      <button onClick={() => fetchComments(post.id)}>
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Pagination
        totalPosts={allPosts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ShowPosts;
