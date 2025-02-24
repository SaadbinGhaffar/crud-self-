import { useParams, useNavigate } from "react-router-dom";
import PostSection from "../PostSection/PostSection";
import PostForm from "../PostForm/PostForm";
import "./Posts.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const Posts = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        //fetch posts from  api of the user gievn in the URL
        const postsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const postsData = await postsResponse.json();

        // Get locally stored posts
        const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
        const userLocalPosts = localPosts.filter(
          (post) => post.userId === parseInt(userId)
        );

        // Combine API and local posts
        setPosts([...postsData, ...userLocalPosts]);

        // Fetch all comments
        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments`
        );
        const commentsData = await commentsResponse.json();

        // Get locally stored comments
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];

        setComments([...commentsData, ...localComments]);
        setMessage("Data loaded successfully!");
      } catch (error) {
        setMessage(`Error loading data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Post Operations
  const handleCreatePost = async (title, content) => {
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content cannot be empty.");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title,
            body: content,
            userId: parseInt(userId),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const newPost = await response.json();

      // Generate a unique ID for the new post
      const enhancedPost = {
        ...newPost,
        id: crypto.randomUUID(),
        isLocal: true,
        createdAt: new Date().toISOString(),
      };

      // Update posts state
      setPosts((prevPosts) => [...prevPosts, enhancedPost]);

      // Store in localStorage
      const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      localStorage.setItem(
        "userPosts",
        JSON.stringify([...localPosts, enhancedPost])
      );

      // Trigger storage event for other components to detect
      window.dispatchEvent(new Event("storage"));

      setMessage("Post created successfully!");
    } catch (error) {
      setMessage(`Error creating post: ${error.message}`);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  const handleDeletePost = async (postId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: "DELETE",
        });

        // Update local state
        setPosts(posts.filter((post) => post.id !== postId));
        setComments(comments.filter((comment) => comment.postId !== postId));

        // Update localStorage
        const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
        const updatedLocalPosts = localPosts.filter(
          (post) => post.id !== postId
        );
        localStorage.setItem("userPosts", JSON.stringify(updatedLocalPosts));

        // Update comments in localStorage
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];
        const updatedLocalComments = localComments.filter(
          (comment) => comment.postId !== postId
        );
        localStorage.setItem(
          "userComments",
          JSON.stringify(updatedLocalComments)
        );

        // Trigger storage event
        window.dispatchEvent(new Event("storage"));

        setMessage("Post deleted successfully!");
      } catch (error) {
        setMessage(`Error deleting post: ${error.message}`);
      }
    }
  };

  const handleEditPost = async (postId) => {
    navigate(`/edit-post/${postId}`); //as we are editing the post on a new screen
  };

  // Comment Operations
  const handleCreateComment = async (postId, body) => {
    if (!body.trim()) {
      setMessage("Comment field is required.");
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
          method: "POST",
          body: JSON.stringify({
            postId,
            body,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const newComment = await response.json();

      // Generate a unique ID for the new comment
      const enhancedComment = {
        ...newComment,
        id: crypto.randomUUID(), // Generates a truly unique ID
        isLocal: true,
        createdAt: new Date().toISOString(),
      };

      // Update comments state
      setComments((prevComments) => [...prevComments, enhancedComment]);

      // Update localStorage
      const localComments =
        JSON.parse(localStorage.getItem("userComments")) || [];
      localStorage.setItem(
        "userComments",
        JSON.stringify([...localComments, enhancedComment])
      );

      // Trigger storage event
      window.dispatchEvent(new Event("storage"));

      setMessage("Comment added successfully!");
    } catch (error) {
      setMessage(`Error adding comment: ${error.message}`);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (isConfirmed) {
      try {
        await fetch(
          `https://jsonplaceholder.typicode.com/comments/${commentId}`,
          {
            method: "DELETE",
          }
        );

        // Update comments state to remove the deleted comment
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );

        // Update localStorage
        const localComments =
          JSON.parse(localStorage.getItem("userComments")) || [];
        const updatedLocalComments = localComments.filter(
          (comment) => comment.id !== commentId
        );
        localStorage.setItem(
          "userComments",
          JSON.stringify(updatedLocalComments)
        );

        // Trigger storage event
        window.dispatchEvent(new Event("storage"));

        setMessage("Comment deleted successfully!");
      } catch (error) {
        setMessage(`Error deleting comment: ${error.message}`);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading posts and comments...</div>;
  }

  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <h3 className="subheader">
        Total {posts.length}{" "}
        {posts.length === 1 || posts.length === 0 ? "Post" : "Posts"}
      </h3>

      {posts.map((post) => (
        <PostSection
          key={post.id}
          post={{ ...post, content: post.body || post.content }}
          comments={[
            ...comments.filter((comment) => comment.postId === post.id),
            ...(JSON.parse(localStorage.getItem(`comments_${post.id}`)) || []), // Include stored comments
          ]}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onCreateComment={handleCreateComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
      <PostForm onCreatePost={handleCreatePost} isSubmitting={isSubmitting} />
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Posts;
