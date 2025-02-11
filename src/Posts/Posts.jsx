import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostSection from "../PostSection/PostSection";
import PostForm from "../PostForm/PostForm";
import "./Posts.css";

const Posts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // Post Operations
  const handleCreatePost = (title, content) => {
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content cannot be empty.");
      return;
    }
    const newPost = {
      id: posts.length + 1,
      title,
      content,
      authorId: parseInt(userId),
    };
    setPosts([...posts, newPost]);
    setMessage("Post created successfully!");
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    setComments(comments.filter((comment) => comment.postId !== postId));
    setMessage("Post deleted successfully!");
  };

  const handleEditPost = (postId, title, content) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, title, content } : post
      )
    );
    setMessage("Post updated successfully!");
  };

  // Comment Operations
  const handleCreateComment = (postId, name, body) => {
    if (!name.trim() || !body.trim()) {
      setMessage("Comment fields are required.");
      return;
    }
    const newComment = {
      id: comments.length + 1,
      postId,
      name,
      body,
    };
    setComments([...comments, newComment]);
    setMessage("Comment added successfully!");
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
    setMessage("Comment deleted successfully!");
  };

  return (
    <div className="container">
      <h2 className="header">User {userId}'s Posts</h2>
      <h3 className="subheader">
        Total {posts.length} {posts.length > 1 ? "Posts" : "Post"}
      </h3>

      {posts.map((post) => (
        <PostSection
          key={post.id}
          post={post}
          comments={comments.filter((comment) => comment.postId === post.id)}
          onDeletePost={handleDeletePost}
          onEditPost={handleEditPost}
          onCreateComment={handleCreateComment}
          onDeleteComment={handleDeleteComment}
        />
      ))}

      <PostForm onCreatePost={handleCreatePost} />
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Posts;
