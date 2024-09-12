import React from 'react'
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from "../api/firebase";
import '../styles/signout.css'



const SignOut: React.FC = () => {

  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("user"); 
      setIsSignedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Sign-out Error:", error);
    }
  };
    return (
    <div>
    <button className="signout" type="submit" title="signout" onClick={handleSignOut}>
    Sign Out
  </button>
  </div>
  )
}
export default SignOut