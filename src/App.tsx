import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ArtDetail from "./pages/ArtDetail";
import UploadFile from "./pages/UploadFile";
import ArtistProfile from "./pages/ArtistProfile";
import './App.css'

function App() {

  const userDetails = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  // const togglePopup = () => {
  //   console.log("");
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arts/:artId" element={<ArtDetail />} />
        <Route path="/new" element={<UploadFile />} />

        <Route 
          path="/artist/:userId" 
          element={
            <ArtistProfile 
              userId={1}
              userDetails={userDetails} togglePopup={function (): void {
                throw new Error("Function not implemented.");
              } }              
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
