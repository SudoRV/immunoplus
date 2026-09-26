import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Team } from "./pages/Team";
import { Join } from "./pages/Join";
import { Contact } from "./pages/Contact";
import WarrantyPage from "./pages/Warranty";
import LinkTree from "./pages/LinkTree";
import Footer from "./components/Footer";

import FcmAnalytics from './services/fcmAnalytics';
import QrScan from './pages/QrScan';

function App() {

  return (
    <BrowserRouter>
    <FcmAnalytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/team" element={<Team />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/warranty" element={<WarrantyPage />} />
         
         <Route path="/links" element={<LinkTree />} />
             
        <Route path="/qrscan/:appname" element={<QrScan />} />
      </Routes>
      
      { window.location.pathname !== "/links" &&(
          <Footer />
      )}
    </BrowserRouter>
  );
}

export default App;
