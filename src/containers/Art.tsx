import type { Art as ArtType } from "../constants/arts";
import "../styles/art.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";



interface ArtProps {
  key: string;
  art: ArtType;
}

const Art = ({ art }: ArtProps) => {

  const [ isLiked, setIsLiked] = useState(false)

  const handleLike =() => {
    setIsLiked(prev => !prev)
  }
  return (
    <div className="art-container">
      <img className="art-image" src={art.image} alt={art.name} />
      <div className="like-and-comment">
        <div className="likecomment">
          <div>
            <button onClick={handleLike} className="like-button">
              {isLiked ? <FaHeart className="art-icon"  color="black"/> : <FaRegHeart className="art-icon" />}
            </button>
          </div>
          <div>
            <button className="comment-button"><FaRegComment className="art-icon"/></button>
          </div>
        </div>

        <div className="countlikes">
          <p className="">{art.numberOfLikes} likes</p>
          <p>{art.comments.length} comments</p>
        </div>
      </div>
      <h3 className="art-name">{art.name}</h3>
      <div className="art-details">
        <p className="art-description">{art.description.length > 200 ? art.description.slice(0, 200) + "..." : art.description}</p>
      </div>
    </div>
  );
};

export default Art;
