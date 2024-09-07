import React, { useState } from "react";
import "../styles/pop.css"; // Import the styles from an external file or inline styles

interface Comment {
  id: number;
  text: string;
}

const CommentPopup: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, text: "Great post!" },
    { id: 2, text: "Thanks for sharing." },
  ]);

  const [newComment, setNewComment] = useState<string>("");
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

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

  return (
    <div>
      <button className="popup-btn" onClick={() => setIsPopupVisible(true)}>
        Show Comments
      </button>

      {isPopupVisible && (
        <div className="popup-overlay" onClick={() => setIsPopupVisible(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h2>Comments</h2>
            <div className="comment-list">
              {comments.map((comment) => (
                <p key={comment.id}>{comment.text}</p>
              ))}
            </div>

            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button onClick={handleAddComment}>Add Comment</button>
            <button
              className="close-btn"
              onClick={() => setIsPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentPopup;
