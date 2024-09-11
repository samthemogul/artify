import React, { useState, useEffect } from "react";
import profilePic from "../assets/profile.png";
import artimage from "../assets/art-1.jpg";
import "../styles/artistprofile.css";
import Header from '../containers/Header';
import arts from '../constants/arts';
import { useNavigate } from 'react-router-dom';
import UserProfile from "../pages/UserProfile";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface ArtistProfileProps {
  userId: number;
  userDetails: UserDetails;
  togglePopup: () => void;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({ userId, userDetails }) => {

const [isPopupVisible, setPopupVisible] = useState(false);
  const [details, setDetails] = useState(userDetails);

  const navigate = useNavigate();

  const handlePostClick = (postId: string | number) => {
    const numericPostId = typeof postId === 'string' ? Number(postId) : postId;
    navigate(`/arts/id${numericPostId}`);
  };

  useEffect(() => {
    setDetails(userDetails)
  }, [userDetails])

  const togglePopupHandler = () => {
    setPopupVisible(!isPopupVisible);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   updateUserDetails({name, email, phone, address });
  // };

  const updateUserDetails = (updatedDetails: {name:string, email: string; phone: string; address: string }) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedDetails,
    }));
    setPopupVisible(false);
  };

  return (
    <div>
      <Header />
      <div className="profile-page">
        <img className='profile-img' src={profilePic} alt="Profile" />
        <h1>{details.name}</h1>
        <div className="details">
          <p>{details.email}</p>
          <p>{details.phone}</p>
          <p>{details.address}</p>
        </div>
        <button className="editprofile" title="submit" type="submit" onClick={togglePopupHandler}>
          Edit Profile
        </button>
        <div className="user-profile">
          <h2>User's Recent Posts</h2>
          <div className="recent-posts">
            {arts.map((art) => (
              <div key={art.id} className="post-item" onClick={() => handlePostClick(art.id)}>
                <img src={art.image || artimage} alt='' />
                <div className='post-details'>
                  <p>{art.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isPopupVisible && (
          <UserProfile
            isPopupVisible={isPopupVisible}
            togglePopup={togglePopupHandler}
            updateUserDetails={updateUserDetails}
            userDetails={details}
          />
        )}
      </div>
    </div>
  );
};

export default ArtistProfile;
