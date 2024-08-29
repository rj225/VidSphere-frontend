import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/profile/Dashboard";
import UpdateName from "./components/profile/update/UpdateName";
import UpdatePassword from "./components/profile/update/UpdatePassword";
import UpdateImage from "./components/profile/update/UpdateImage";
import Navtest from "./components/Navtest";
import Report from "./components/profile/Report";
import Dropdown from "./components/profile/Dropdown";
import EditVideoDetails from "./components/video/update/EditVideoDetails";
import DeleteVideo from "./components/video/update/DeleteVideo";
import VideoUpload from "./components/video/VideoUpload";
import DisplayAll from "./components/video/DisplayAll";
import VideoPlayer from "./components/video/VideoPlayer";
import Playlist from "./components/profile/Playlist";
import Comments from "./components/Comments/Comments";
import WatchHistoryPage from "./pages/WatchHistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/:user" element={<Dashboard />} />
        <Route path="/updatename" element={<UpdateName />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/updateimage" element={<UpdateImage />} />
        <Route path="/navtest" element={<Navtest />} />
        <Route path="/report" element={<Report />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/editvideo/:video" element={<EditVideoDetails />} />
        <Route path="/delete" element={<DeleteVideo />} />
        <Route path="/videoupload" element={<VideoUpload />} />
        <Route path="/displayall" element={<DisplayAll />} />
        <Route path="/videoplayer/:id" element={<VideoPlayer />} />
        <Route path="/play" element={<Playlist />} />
        <Route path="/comment" element={<Comments />} />
        <Route path="/watchhistory" element={<WatchHistoryPage />} />
      </Routes>
      <ToastContainer pauseOnHover={false} theme="colored" />
    </BrowserRouter>
  );
}
