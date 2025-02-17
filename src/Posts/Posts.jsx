// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import PostSection from "../PostSection/PostSection";
// import PostForm from "../PostForm/PostForm";
// import "./Posts.css";

// const Posts = () => {
//   const { userId } = useParams();
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState("");

//   // Post Operations
//   const handleCreatePost = (title, content) => {
//     if (!title.trim() || !content.trim()) {
//       setMessage("Title and content cannot be empty.");
//       return;
//     }
//     const newPost = {
//       id: posts.length + 1,
//       title,
//       content,
//       authorId: parseInt(userId),
//     };
//     setPosts([...posts, newPost]);
//     setMessage("Post created successfully!");
//   };

//   const handleDeletePost = (postId) => {
//     setPosts(posts.filter((post) => post.id !== postId));
//     setComments(comments.filter((comment) => comment.postId !== postId));
//     setMessage("Post deleted successfully!");
//   };

//   const handleEditPost = (postId, title, content) => {
//     setPosts(
//       posts.map((post) =>
//         post.id === postId ? { ...post, title, content } : post
//       )
//     );
//     setMessage("Post updated successfully!");
//   };

//   // Comment Operations
//   const handleCreateComment = (postId, name, body) => {
//     if (!name.trim() || !body.trim()) {
//       setMessage("Comment fields are required.");
//       return;
//     }
//     const newComment = {
//       id: comments.length + 1,
//       postId,
//       name,
//       body,
//     };
//     setComments([...comments, newComment]);
//     setMessage("Comment added successfully!");
//   };

//   const handleDeleteComment = (commentId) => {
//     setComments(comments.filter((comment) => comment.id !== commentId));
//     setMessage("Comment deleted successfully!");
//   };

//   return (
//     <div className="container">
//       <h2 className="header">User {userId}'s Posts</h2>
//       <h3 className="subheader">
//         Total {posts.length} {posts.length > 1 ? "Posts" : "Post"}
//       </h3>

//       {posts.map((post) => (
//         <PostSection
//           key={post.id}
//           post={post}
//           comments={comments.filter((comment) => comment.postId === post.id)}
//           onDeletePost={handleDeletePost}
//           onEditPost={handleEditPost}
//           onCreateComment={handleCreateComment}
//           onDeleteComment={handleDeleteComment}
//         />
//       ))}

//       <PostForm onCreatePost={handleCreatePost} />
//       {message && <div className="message">{message}</div>}
//     </div>
//   );
// };

// export default Posts;import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostSection from "../PostSection/PostSection";
import PostForm from "../PostForm/PostForm";
import "./Posts.css";
import { useEffect, useState } from "react";

const Posts = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts and comments when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch posts for the specific user from API
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

      // Add some data that will help us identify this as a local post
      const enhancedPost = {
        ...newPost,
        isLocal: true,
        createdAt: new Date().toISOString(),
      };

      // Update posts state
      setPosts([...posts, enhancedPost]);

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

  const handleEditPost = async (postId, title, content) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title,
            body: content,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const updatedPost = await response.json();

      // Get the existing post to check if it's a local one
      const existingPost = posts.find((post) => post.id === postId);
      const isLocalPost = existingPost?.isLocal;

      // Update posts state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                title: updatedPost.title,
                body: updatedPost.body,
                content: updatedPost.body,
                updatedAt: new Date().toISOString(),
              }
            : post
        )
      );

      // If this was a local post, update it in localStorage too
      if (isLocalPost) {
        const localPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
        const updatedLocalPosts = localPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                title: updatedPost.title,
                body: updatedPost.body,
                content: updatedPost.body,
                updatedAt: new Date().toISOString(),
              }
            : post
        );
        localStorage.setItem("userPosts", JSON.stringify(updatedLocalPosts));

        // Trigger storage event
        window.dispatchEvent(new Event("storage"));
      }

      setMessage("Post updated successfully!");
    } catch (error) {
      setMessage(`Error updating post: ${error.message}`);
    }
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

  function logoutUser() {
    localStorage.removeItem("userId");
    navigate("/");
  }

  if (loading) {
    return <div className="loading">Loading posts and comments...</div>;
  }

  return (
    <div className="container">
      <h2 className="header">User {userId}'s Posts</h2>
      <h3 className="subheader">
        Total {posts.length} {posts.length === 1 ? "Post" : "Posts"}
      </h3>

      {posts.map((post) => (
        <PostSection
          key={post.id}
          post={{ ...post, content: post.body || post.content }} // Map API's 'body' to your 'content'
          comments={comments.filter((comment) => comment.postId === post.id)}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onCreateComment={handleCreateComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}
      <PostForm onCreatePost={handleCreatePost} />
      {message && <div className="message">{message}</div>}

      <button onClick={logoutUser}>
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Posts;
