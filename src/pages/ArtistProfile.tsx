import React from "react";
import profilePic from "../assets/profile.png";
import artimage from "../assets/art-1.jpg";
import { useState, useEffect } from "react";
import "../styles/artistprofile.css";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaSquareXTwitter, FaSquareFacebook } from "react-icons/fa6";

interface Post {
  id: number;
  user_id: number;
  content: string;
  timestamp: string;
  imageUrl: string;
}
interface UserProfileProps {
  userId: number;
}
interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  instagram: string;
}
const ArtistProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const [name, setName] = useState("Ife");
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <div className="profile-page">
      <img className="profile-img" src={profilePic} alt="Profile" />
      <h1>{name}</h1>
      <div className="details">
        <p>Email:{userData?.email}</p>
        <p>Phone:{userData?.phone}</p>
        <p>Address:{userData?.address}</p>
      </div>
      <div className="sociallinks">
        <a href={userData?.twitter}>
          <FaSquareXTwitter className="linkimg" />
        </a>
        <a href={userData?.linkedin}>
          <CiLinkedin className="linkimg" />
        </a>
        <a href={userData?.facebook}>
          <FaSquareFacebook className="linkimg" />
        </a>
        <a href={userData?.instagram}>
          <CiInstagram className="linkimg" />
        </a>
      </div>
      <div className="user-profile">
        <h2>User's Recent Posts</h2>
        <div className="recent-posts">
          <img src={artimage} alt="" />
          <img src={artimage} alt="" />
          <img src={artimage} alt="" />
          <img src={artimage} alt="" />
          <img src={artimage} alt="" />
          <img src={artimage} alt="" />
          {posts.map((post) => (
            <div key={post.id} className="post-item">
              <img src={post.imageUrl || artimage} alt="Post Image" />
              <p>{post.content}</p>
              <small>{new Date(post.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
