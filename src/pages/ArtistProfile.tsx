import React, { useState, useEffect } from "react";
import artimage from "../assets/art-1.jpg";
import "../styles/artistprofile.css";
import Header from '../containers/Header';
import arts from '../constants/arts';
import { useNavigate } from 'react-router-dom';
import { auth } from "../api/firebase";
import UserProfile from "../pages/UserProfile";
import SignOut from "../pages/SignOut";

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

const getCachedUser = () => {
  const cachedUserString = localStorage.getItem("user");
  if (cachedUserString) {
    return JSON.parse(cachedUserString) || null;
  }
  return null;
};

const ArtistProfile: React.FC<ArtistProfileProps> = ({ userDetails }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [details, setDetails] = useState(userDetails);
  const [cachedUser, setCachedUser] = useState(getCachedUser());

  const navigate = useNavigate();

  const handlePostClick = (postId: string | number) => {
    const numericPostId = typeof postId === 'string' ? Number(postId) : postId;
    navigate(`/arts/id${numericPostId}`);
  };

  useEffect(() => {
    setDetails(userDetails);
  }, [userDetails]);

  const togglePopupHandler = () => {
    setPopupVisible(!isPopupVisible);
  };

  const updateUserDetails = (updatedDetails: { name: string; email: string; phone: string; address: string }) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedDetails,
    }));
    localStorage.setItem("user", JSON.stringify(updatedDetails));
    setCachedUser(updatedDetails);
    setPopupVisible(false);
  };
 

  return (
    <div>
      <Header />
      <div className="profile-page">
     <div className="profile">
      <div> 
      <img
          className="profile-img"
          src={
            cachedUser?.imageUrl
              ? cachedUser.imageUrl
              : auth.currentUser?.photoURL || ""
          }
          alt={
            cachedUser?.name
              ? cachedUser.name
              : auth.currentUser?.displayName || ""
          }
        />
      </div>
         <div className="details">
         <h1>{cachedUser?.name
              ? cachedUser?.name
              : auth.currentUser?.displayName}</h1> 
          <p>{cachedUser?.email
              ? cachedUser?.email
              : auth.currentUser?.email}</p>
          <p>{cachedUser?.phone
              ? cachedUser?.phone
              : auth.currentUser?.phoneNumber}</p>
          {/* <p>{cachedUser?.address
              ? cachedUser?.address
              : auth.currentUser?.address}</p> */}
        </div> 
     </div>
     <div className="logout">
        <button className="editprofile" title="submit" type="submit" onClick={togglePopupHandler}>
          Edit Profile
        </button>
          <SignOut/>
        </div>
        
        <div className="user-profile">
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
