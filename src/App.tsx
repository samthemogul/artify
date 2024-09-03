import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ArtDetail from "./pages/ArtDetail";
import UploadFile from "./pages/UploadFile";
import ArtistProfile from "./pages/ArtistProfile";
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/arts/:artId" element={<ArtDetail />} />
      <Route path="/new" element={<UploadFile />} />
      <Route path="/artists/:artistId" element={<ArtistProfile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
