import type { Art as ArtType } from "../constants/arts";
import "../styles/art.css";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import profilePic from '../assets/profile.png'
import { SetStateAction, useState } from "react";
import arts from "../constants/arts";

interface ArtProps {
  key: string;
  art: ArtType;
}

const Art = ({ art }: ArtProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [ comment, setComment ] = useState("")

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleChangeComment = (event: { target: { value: SetStateAction<string>; }; }) => {
    setComment(event.target.value)
  }
  return (
    <div className="art-container">
      <div className="art-header">
        <div className="art-artist">
          <img className="art-artist-pic" src={profilePic} alt="profile" />
          <p className="artist-name">{art.artist}</p>
        </div>
        <div className="art-menu">
          <button className="menu-button">
            <HiOutlineDotsVertical className="art-menu-icon" />
          </button>
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
            <button className="comment-button">
              <IoChatbubbleOutline className="art-icon" />
            </button>
          </div>
        </div>

        <div className="countlikes">
          <p className="">{art.numberOfLikes} likes</p>
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
        <input className="comment-input" value={comment} onChange={handleChangeComment} type="text" placeholder="Add a comment..." />
        { comment.length > 2 ? <button className="post-comment">Post</button> : null}
      </div>
    </div>
  );
};

export default Art;