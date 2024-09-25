import type { Art as ArtType } from "../constants/arts";
import "../styles/art.css";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { SetStateAction, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../api/firebase";
import CommentPopup from "../pages/CommentPoP";
import { Link} from "react-router-dom";


interface ArtProps {
  key: string;
  art: ArtType;
}

const getCachedUser = () => {
  const cachedUserString = localStorage.getItem("user");
  if (cachedUserString) {
    return JSON.parse(cachedUserString) || null;
  }
  return null;
};

const Art = ({ art }: ArtProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesNumber, setLikesNumber ] = useState<number>(art.numberOfLikes)
  const [comment, setComment] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [cachedUser, setCachedUser] = useState(getCachedUser());

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    if (isLiked) {
      setLikesNumber(prev => prev - 1)
      } else {
        setLikesNumber(prev => prev + 1)
        }
    setTimeout(() => {
      updateDoc(doc(db, "arts", art.id), {
        likes: isLiked ? art.numberOfLikes - 1 : art.numberOfLikes + 1,
        });
    }, 3000)
  };

  const handleChangeComment = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setComment(event.target.value);
  };
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <div className="art-container">
      <div className="art">
      <div> 
      <img
          className="art-img"
          src={
            cachedUser?.imageUrl
              ? cachedUser.imageUrl
              : auth.currentUser?.photoURL || ""
          }
          alt={
            cachedUser?.userId
              ? cachedUser.userId
              : auth.currentUser?.uid || ""
          }
        />
      </div>
         <div className="user-details">
         <p>{cachedUser?.userId ? (
          <Link className="user-name" to={`/artists/${cachedUser.userId}`}>
          {cachedUser?.userId}
          </Link>
         ): auth.currentUser?.displayName ? (
          <Link to={`/artists/${auth.currentUser.uid}`}>
            {auth.currentUser.displayName}
          </Link>
         ) : null}</p> 
        </div> 
     </div>
      <img className="art-image" src={art.image} alt={art.name} />
      <div className="like-and-comment">
        <div className="likecomment">
          <div>
            <button onClick={handleLike} className="like-button">
              {isLiked ? (
                <IoHeartSharp className="art-icon" color="black" />
              ) : (
                <IoHeartOutline className="art-icon" />
              )}
            </button>
          </div>
          <div>
            <button title="outline" className="comment-button" onClick={togglePopup}>
              <IoChatbubbleOutline className="art-icon" />
            </button>
          </div>
        </div>

        <div className="countlikes">
          <p className="">{likesNumber} likes</p>
        </div>
      </div>
      <h3 className="art-name">{art.name}</h3>
      <div className="art-details">
        <p className="art-description">
          {art.description.length > 200
            ? art.description.slice(0, 200) + "..."
            : art.description}
        </p>
      </div>
      <button className="view-comment-btn">
        {art.comments.length < 1
          ? null
          : art.comments.length == 1
          ? "View comment"
          : `View all ${art.comments.length} comments`}
      </button>
      <div className="comment-section">
        <input
          className="comment-input"
          value={comment}
          onChange={handleChangeComment}
          type="text"
          placeholder="Add a comment..."
        />
        {comment.length > 2 ? (
          <button className="post-comment">Post</button>
        ) : null}
      </div>
      {<CommentPopup isPopupVisible={isPopupVisible} togglePopup={togglePopup} />}
    </div>
  );
};

export default Art;
