import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import "../styles/userinfo.css";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../api/firebase";

const UserInfo = () => {
  const getCachedUser = () => {
    const cachedUserString: string | null = localStorage.getItem("user");
    if (cachedUserString) {
      return JSON.parse(cachedUserString || "") || null;
    }
  };
  const [cachedUser] = useState(getCachedUser());
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(!!cachedUser?.name.length);
  const { saveUser } = useUser() || {
    user: null,
    saveUser: () => {},
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);

    if (auth.currentUser) {
      const signedInUser = {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        imageUrl: auth.currentUser.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(signedInUser));
      setIsSignedIn(true);
      saveUser(signedInUser);
    }
  };

  const goToUpload = () => {
    navigate("/new");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsSignedIn(true);
      // get user object from local storage and save the user
      saveUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (cachedUser) {
      setIsSignedIn(true);
    }
  }, []);
  return (
    <div className="userinfocon">
      {isSignedIn ? (
        <div className="signedinmessage">
          {window.location.pathname == "/new" ? null : (
            <button onClick={goToUpload} className="signinbtn">
              <p className="signInText">Upload Art</p>
            </button>
          )}
          <h3 className="welcometext">
            Welcome,{" "}
            {cachedUser?.name
              ? cachedUser?.name
              : auth.currentUser?.displayName}
          </h3>
          <img
            className="profilepic"
            src={
              cachedUser?.imageUrl
                ? cachedUser?.imageUrl
                : auth.currentUser?.photoURL || ""
            }
            alt={
              cachedUser?.name
                ? cachedUser?.name
                : auth.currentUser?.displayName
            }
          />
        </div>
      ) : (
        <div>
          <button className="signinbtn" onClick={signInWithGoogle}>
            <FaGoogle className="googleIcon" />
            <p className="signInText">Sign in with Google</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
