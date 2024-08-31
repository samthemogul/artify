import type { Art as ArtType } from "../constants/arts";
import "../styles/art.css";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";



interface ArtProps {
  key: string;
  art: ArtType;
}

const Art = ({ art }: ArtProps) => {
  return (
    <div className="art-container">
      <img className="art-image" src={art.image} alt={art.name} />
      <div className="like-and-comment">
        <div className="likecomment">
          <div>
            <button className="like-button"><FaHeart className="heart"/></button>
          </div>
          <div>
            <button className="comment-button"><FaRegComment className="comment"/></button>
          </div>
        </div>

        <div className="countlikes">
          <p>{art.numberOfLikes} likes</p>
          <p>{art.comments.length} comments</p>
        </div>
      </div>
      <h3>{art.name}</h3>
      <div className="art-details">
        <p>{art.description}</p>
      </div>
    </div>
  );
};

export default Art;
