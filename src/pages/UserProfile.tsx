import React from 'react';
import '../styles/userprofile.css'
import { useState, useEffect } from 'react';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface UserProfileProps {
  isPopupVisible: boolean;
  togglePopup: () => void;
  updateUserDetails: (details: {name:string; email: string; phone: string; address: string }) => void;
  userDetails: UserDetails;
}

const UserProfile: React.FC<UserProfileProps> = ({userDetails, togglePopup, updateUserDetails }) => {
  const [formDetails, setFormDetails] = useState(userDetails);


  useEffect(() => {
    setFormDetails(userDetails);
  }, [userDetails])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserDetails(formDetails)
  };

  return (
    <div className="popup-overlay" onClick={togglePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Profile</h2>
        <div className='userdetails'>
        <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name= "name"
          value={formDetails.name}
          placeholder="Username" 
          onChange={handleChange}/>

          <input 
          type="text" 
          name ="email"
          value={formDetails.email}
          placeholder="Email" 
          onChange={handleChange}/>

          <input
          type="text" 
          name="phone"
          value={formDetails.phone}
          placeholder="Phone" 
          onChange={handleChange}/>

          {/* <input 
          type="text"
          name="address" 
          value={formDetails.address}
          placeholder="Address"
          onChange={handleChange}/> */}
          <div>
          <button className='save' type="submit">Save</button>
        </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
