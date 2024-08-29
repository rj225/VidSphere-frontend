import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Lazy loading the components
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const Dashboard = React.lazy(() => import("./components/profile/Dashboard"));
const UpdateName = React.lazy(() => import("./components/profile/update/UpdateName"));
const UpdatePassword = React.lazy(() => import("./components/profile/update/UpdatePassword"));
const UpdateImage = React.lazy(() => import("./components/profile/update/UpdateImage"));
const Navtest = React.lazy(() => import("./components/Navtest"));
const Report = React.lazy(() => import("./components/profile/Report"));
const Dropdown = React.lazy(() => import("./components/profile/Dropdown"));
const EditVideoDetails = React.lazy(() => import("./components/video/update/EditVideoDetails"));
const DeleteVideo = React.lazy(() => import("./components/video/update/DeleteVideo"));
const VideoUpload = React.lazy(() => import("./components/video/VideoUpload"));
const DisplayAll = React.lazy(() => import("./components/video/DisplayAll"));
const VideoPlayer = React.lazy(() => import("./components/video/VideoPlayer"));
const Playlist = React.lazy(() => import("./components/profile/Playlist"));
const Comments = React.lazy(() => import("./components/Comments/Comments"));
const WatchHistoryPage = React.lazy(() => import("./pages/WatchHistoryPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}
