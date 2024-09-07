import React, { ChangeEvent, useState } from "react";
import "../styles/pop.css";
import { IoMdClose } from "react-icons/io"; // Import the styles from an external file or inline styles

interface Comment {
  id: number;
  text: string;
}

interface CommentPopupProps {
  isPopupVisible: boolean;
  togglePopup: () => void
}

const CommentPopup: React.FC<CommentPopupProps> = ({ isPopupVisible, togglePopup }) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "Great post!" },
    { id: 2, text: "Thanks for sharing." },
  ]);

  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject: Comment = {
        id: comments.length + 1,
        text: newComment,
      };
      setComments([...comments, newCommentObject]);
      setNewComment(""); // Clear the input field after adding a comment
    }
  };

  const handleCommentChange =(e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  }

  return (
    <div>
      

      {isPopupVisible && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Comments</h2>
            <div className="comment-list">
              {comments.map((comment) => (
                <p key={comment.id}>{comment.text}</p>
              ))}
            </div>

            <div className="comment-section">
        <input
          className="comment-input"
          value={newComment}
          onChange={handleCommentChange}
          type="text"
          placeholder="Add a comment..."
        />
        {newComment.length > 2 ? (
          <button onClick={handleAddComment} className="post-comment">Post</button>
        ) : null}
      </div>
            <button
              className="close-btn"
              onClick={togglePopup}
            >
              <IoMdClose color="black" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentPopup;
