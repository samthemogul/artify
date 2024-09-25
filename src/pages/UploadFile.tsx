import Header from "../containers/Header";
import "../styles/upload.css";
import demoImage from "../assets/demo-image.jpg";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { redirect, useNavigate } from "react-router-dom";
import { auth, db } from "../api/firebase";
import { addDoc, collection } from "firebase/firestore";
// import { BouncingBalls } from "loaders-ui";

interface formType {
  name: string;
  description: string;
  image: any;
}
const UploadFile = () => {
  const navigate = useNavigate();
  const artsCollection = collection(db, "arts");

  const fileInput = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<formType>({
    name: "",
    description: "",
    image: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImagetoStorage = async () => {
    const user = auth.currentUser;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file!.name);
    const uploadTask = uploadBytesResumable(storageRef, file!);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            // create the art document in the arts collection with fields: id, userid, name, description, likes,
            // and image url
            if (user) {
              addDoc(artsCollection, {
                userid: user.uid,
                name: formData.name,
                description: formData.description,
                imageUrl: downloadURL,
                likes: 0,
              });
            } else {
              console.log("User is not logged in");
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to create an art");
      return
    } else {
      setLoading(true);
      e.preventDefault();
      uploadImagetoStorage().then(() => {
        setFormData({
          name: "",
          description: "",
          image: null,
        });
        localStorage.setItem(
          "formdata",
          JSON.stringify({
            name: "",
            description: "",
            image: null,
          })
        );
        if (!loading) {
          navigate("/");
        }
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const filereader = new FileReader();
      filereader.onloadend = () => {
        setFormData({ ...formData, image: filereader.result as string });
        localStorage.setItem(
          "formdata",
          JSON.stringify({
            ...formData,
            image: filereader.result as string,
          })
        );
      };
      filereader.readAsDataURL(selectedFile);
      console.log(selectedFile);
    }
  };
  const handleTextInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    localStorage.setItem(
      "formdata",
      JSON.stringify({ ...formData, [name]: value })
    );
  };
  useEffect(() => {
    const storedFormData = localStorage.getItem("formdata");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setFormData({
        ...formData,
        name: parsedFormData.name,
        description: parsedFormData.description,
        image: parsedFormData.image,
      });
    }
  }, []);
  return (
    <div className="upload-page-container">
      <Header />
      <h1 className="upload-page-title">Upload Art</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="image-view">
          <img
            className="art-view-image"
            src={formData.image ? formData.image : demoImage}
            alt="Demo Image"
          />
          <label className="file-pick-button" htmlFor="art-upload">
            Choose File
          </label>
        </div>

        <input
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          name="file"
          id="art-upload"
          hidden
        />
        <input
          value={formData.name}
          onChange={handleTextInputChange}
          className="name-input"
          type="text"
          name="name"
          placeholder="Name of Art..."
        />
        <textarea
          value={formData.description}
          onChange={handleTextInputChange}
          className="description-input"
          name="description"
          placeholder="Describe your art..."
        />
        {!loading ? (
          <button className="submit-art-btn" type="submit">
            Upload
          </button>
        ) : (
          <button className="submit-art-btn loading" disabled>
            Loading...
          </button>
        )}
      </form>
    </div>
  );
};

export default UploadFile;
