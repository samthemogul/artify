import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Upload.css";

const Upload: React.FC = () => {
  const [artName, setArtName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (file && artName && description) {
      // Handle form submission logic here (e.g., upload to server or cloud storage)
      console.log({
        file,
        artName,
        description,
      });

      // Redirect to another page after submission (optional)
      navigate("/some-page");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <h2>Upload Your Art</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="artName">Art Name</label>
          <input
            type="text"
            id="artName"
            value={artName}
            onChange={(e) => setArtName(e.target.value)}
            placeholder="Enter the name of the art"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description of the art"
          />
        </div>
        <div>
          <button type="submit">Submit Art</button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
