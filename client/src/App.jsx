import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar";
import UploadAPI from "./pages/UploadAPI";
import ApiPage from "./pages/APIs/APIs";
import BrowseApis from "./pages/Search/SearchAPI";
import UpdateAPI from "./pages/APIs/UpdateAPI";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import PageNotFound from "./pages/404/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/:id" element={<ApiPage />} />
        <Route path="/api/update/:id" element={<UpdateAPI />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/upload" element={<UploadAPI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allApis/:language?" element={<BrowseApis />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
