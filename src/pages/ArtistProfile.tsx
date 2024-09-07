import React from "react";
import profilePic from "../assets/profile.png";
import artimage from "../assets/art-1.jpg";
import { useState, useEffect } from "react";
import "../styles/artistprofile.css";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaSquareXTwitter, FaSquareFacebook } from "react-icons/fa6";
import Header from '../containers/Header'
import arts from '../constants/arts'
import { useNavigate } from 'react-router-dom';

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

  const [ name, setName ] = useState("Ife")
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
  
    navigate(`/arts/id${postId}`);
  };

  return (
  
    <div>
      <div>
        <Header/>
      </div>
      <div className="profile-page">
      <img className='profile-img' src={profilePic} alt="Profile" />
    <h1>{name}</h1>
    <div className="details">
      <p>Email:{userData?.email}</p>
      <p>Phone:{userData?.phone}</p>
      <p>Address:{userData?.address}</p>
    </div>
    <div className="sociallinks">
      <a href={userData?.twitter}><FaSquareXTwitter className='linkimg' /></a>
      <a href={userData?.linkedin}><CiLinkedin className='linkimg' /></a>
      <a href={userData?.facebook}><FaSquareFacebook className='linkimg' /></a>
      <a href={userData?.instagram}><CiInstagram className='linkimg' /></a>
    </div>
    <div className="user-profile">
      <h2>User's Recent Posts</h2>
      <div className="recent-posts">
        {arts.map((art) => (
          <div key={art.id} className="post-item" onClick={() => handlePostClick(art.id)}>
            <img src={art.image || artimage} alt=''/>
            <div className='post-details'>
            <p>{art.artist}</p>
            <p>{art.name}</p>
            </div>
            {/* <small>{new Date(art.timestamp).toLocaleString()}</small> */}
          </div>
        ))}
      </div>
    </div>
      </div>
  
    </div>
  );
};

export default ArtistProfile;
