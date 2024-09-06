import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { lazy } from "react";
import Home from "./components/Home";
// import DisplayAll from "./components/video/DisplayAll";

const YourVideosPage = lazy(() => import ("./pages/YourVideosPage"));
const PlaylistPage = lazy(() => import ("./pages/PlaylistPage"));
const AboutUsPage = lazy(() => import ("./pages/AboutUsPage"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Dashboard = lazy(() => import("./components/profile/Dashboard"));
const UpdateName = lazy(() => import("./components/profile/update/UpdateName"));
const UpdatePassword = lazy(() => import("./components/profile/update/UpdatePassword"));
const UpdateImage = lazy(() => import("./components/profile/update/UpdateImage"));
const Report = lazy(() => import("./components/profile/Report"));
const Dropdown = lazy(() => import("./components/profile/Dropdown"));
const EditVideoDetails = lazy(() => import("./components/video/update/EditVideoDetails"));
const DeleteVideo = lazy(() => import("./components/video/update/DeleteVideo"));
const VideoUpload = lazy(() => import("./components/video/VideoUpload"));
// const DisplayAll = lazy(() => import("./components/video/DisplayAll"));
const VideoPlayer = lazy(() => import("./components/video/VideoPlayer"));
// const Playlist = lazy(() => import("./components/profile/Playlist"));
const Comments = lazy(() => import("./components/Comments/Comments"));
const WatchHistoryPage = lazy(() => import("./pages/WatchHistoryPage"));
const SubscribersPage = lazy(() => import ("./pages/SubscribersPage"));

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
          <Route path="/report" element={<Report />} />
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/editvideo/:video" element={<EditVideoDetails />} />
          <Route path="/delete" element={<DeleteVideo />} />
          <Route path="/videoupload" element={<VideoUpload />} />
          {/* <Route path="/displayall" element={<DisplayAll />} /> */}
          <Route path="/videoplayer/:id" element={<VideoPlayer />} />
          {/* <Route path="/play" element={<Playlist />} /> */}
          <Route path="/comment" element={<Comments />} />
          <Route path="/history" element={<WatchHistoryPage />} />
          <Route path="/subscriptions" element={<SubscribersPage />} />
          <Route path="/yourvideos" element={<YourVideosPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
        </Routes>
        <ToastContainer pauseOnHover={false} theme="colored" />
      </Suspense>
    </BrowserRouter>
  );
}
