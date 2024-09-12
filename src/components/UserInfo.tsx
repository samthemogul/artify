import { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import "../styles/userinfo.css";
import { useNavigate} from "react-router-dom";
import useUser from "../hooks/useUser";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../api/firebase";
import UserProfile from "../pages/UserProfile";

const UserInfo = () => {
  const getCachedUser = () => {
    const cachedUserString: string | null = localStorage.getItem("user");
    if (cachedUserString) {
      return JSON.parse(cachedUserString || "") || null;
    }
  };
  const [cachedUser, setCachedUser] = useState(getCachedUser());
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(!!cachedUser?.name.length);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); 
  const { saveUser } = useUser() || {
    user: null,
    saveUser: () => {},
  };

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const signInWithGoogle = async () => {
    try{
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
      togglePopup();
      navigate("/artist/userId");
    }
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  const goToUpload = () => {
    navigate("/new");
  };


  const updateUserDetails = (updatedDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    const updatedUser = { ...cachedUser, ...updatedDetails };
    setCachedUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsPopupVisible(false);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsSignedIn(true);
      saveUser(JSON.parse(user));
    }
  }, [saveUser]);

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
              <p className="signInText">Upload</p>
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

          {isPopupVisible && (
            <UserProfile
              isPopupVisible={isPopupVisible}
              togglePopup={togglePopup}
              userDetails={{
                name: cachedUser?.name || "",
                email: cachedUser?.email || "",
                phone: "",
                address: "",
              }}
              updateUserDetails={updateUserDetails}
            />
          )}
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
