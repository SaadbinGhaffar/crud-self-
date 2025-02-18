import React, { useState } from "react";
import CommentSection from "../CommentComponent/CommentSection";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import EditButton from "../../components/Buttons/EditButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
const PostSection = ({
  post,
  comments,
  onDeletePost,
  onEditPost,
  onCreateComment,
  onDeleteComment,
}) => {
  const [editPost, setEditPost] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);

  const handleSavePost = () => {
    onEditPost(post.id, newTitle, newContent);
    setEditPost(false);
  };

  return (
    <div className="post" key={post.id}>
      {editPost ? (
        <div className="edit-section">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="textarea"
          />
          <PrimaryButton onClick={handleSavePost} className="save-button">
            Save
          </PrimaryButton>
          <SecondaryButton
            onClick={() => setEditPost(false)}
            className="cancel-button"
          >
            Cancel
          </SecondaryButton>
        </div>
      ) : (
        <div>
          <h3 className="post-title">TITLE: {post.title}</h3>
          <p className="post-content">DESCRIPTION: {post.content}</p>
          <EditButton onClick={() => setEditPost(true)} className="edit-button">
            Edit Post
          </EditButton>{" "}
          <DeleteButton
            onClick={() => onDeletePost(post.id)}
            className="delete-button"
          >
            Delete Post
          </DeleteButton>
        </div>
      )}

      <CommentSection
        comments={comments}
        postId={post.id}
        onCreateComment={onCreateComment}
        onDeleteComment={onDeleteComment}
      />
    </div>
  );
};

export default PostSection;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import CommentSection from "../CommentComponent/CommentSection";
// import EditButton from "../../components/Buttons/EditButton";
// import DeleteButton from "../../components/Buttons/DeleteButton";

// const PostSection = ({
//   post,
//   comments,
//   onDeletePost,
//   onEditPost,
//   onCreateComment,
//   onDeleteComment,
// }) => {
//   const navigate = useNavigate();

//   const handleEditClick = () => {
//     navigate(`/edit-post/${post.id}`, {
//       state: {
//         post: {
//           id: post.id,
//           title: post.title,
//           content: post.content,
//         },
//       },
//     });
//   };

//   return (
//     <div className="post" key={post.id}>
//       <div>
//         <h3 className="post-title">TITLE: {post.title}</h3>
//         <p className="post-content">DESCRIPTION: {post.content}</p>
//         <EditButton onClick={handleEditClick} className="edit-button">
//           Edit Post
//         </EditButton>{" "}
//         <DeleteButton
//           onClick={() => onDeletePost(post.id)}
//           className="delete-button"
//         >
//           Delete Post
//         </DeleteButton>
//       </div>

//       <CommentSection
//         comments={comments}
//         postId={post.id}
//         onCreateComment={onCreateComment}
//         onDeleteComment={onDeleteComment}
//       />
//     </div>
//   );
// };

// export default PostSection;
