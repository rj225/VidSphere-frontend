import Register from "./components/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/profile/Dashboard";

import Report from "./components/profile/Report";
import Dropdown from "./components/profile/Dropdown";
import UpdateName from "./components/profile/update/UpdateName";
import UpdatePassword from "./components/profile/update/UpdatePassword";
import UpdateImage from "./components/profile/update/UpdateImage";
import Navtest from "./components/Navtest";

import VideoUpload from "./components/video/VideoUpload";
import DisplayAll from "./components/video/DisplayAll";
import VideoPlayer from "./components/video/VideoPlayer";
import EditVideoDetails from "./components/video/update/EditVideoDetails";
import DeleteVideo from "./components/video/update/DeleteVideo";

export default function App() {
  return (
    

<BrowserRouter>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
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
    
</Routes>
</BrowserRouter>
    
  )
}