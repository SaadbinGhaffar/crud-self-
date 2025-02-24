import React, { useState } from "react";
import CommentSection from "../CommentComponent/CommentSection";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import EditButton from "../../components/Buttons/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import "./PostSection.css";
import Navbar from "../Navbar/Navbar";
import SavingPosts from "../SavingPosts/SavingPosts";

const PostSection = ({
  post,
  comments,
  onDeletePost,
  onEditPost,
  onCreateComment,
  onDeleteComment,
  logoutUser,
}) => {
  const [editPost, setEditPost] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [showPosts, setShowPosts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSavePost = () => {
    onEditPost(post.id, newTitle, newContent);
    setEditPost(false);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;

    if (!commentText.trim()) {
      setMessage("Comment cannot be empty");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await onCreateComment(post.id, commentText);
      e.target.elements.comment.value = "";
      setMessage("Comment added successfully!");
    } catch (error) {
      setMessage("Error adding comment");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div>
      <div className="post-section">
        <div className="post">
          {editPost ? (
            <SavingPosts
              newTitle={newTitle}
              setNewTitle={setNewTitle}
              newContent={newContent}
              setNewContent={setNewContent}
              handleSavePost={handleSavePost}
              setEditPost={setEditPost}
            />
          ) : (
            <div className="post-content">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.content}</p>
              <div className="button-group">
                <EditButton onClick={handleSavePost} className="edit-button">
                  Edit
                </EditButton>
                <DeleteButton
                  onClick={() => onDeletePost(post.id)}
                  className="delete-button"
                >
                  Delete
                </DeleteButton>
              </div>
            </div>
          )}

          <CommentSection
            comments={comments}
            postId={post.id}
            onCreateComment={onCreateComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostSection;
