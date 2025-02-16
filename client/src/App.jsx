import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar";
import UploadAPI from "./pages/UploadAPI";
import ApiPage from "./pages/APIs/APIs";
import BrowseApis from "./pages/Search/SearchAPI";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/:id" element={<ApiPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadAPI />} />
        <Route path="/allApis/:language?" element={<BrowseApis />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      {/* <Footer /> */}
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
