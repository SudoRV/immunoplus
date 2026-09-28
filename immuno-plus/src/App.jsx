import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { Team } from "./pages/Team";
import { Join } from "./pages/Join";
import { Contact } from "./pages/Contact";
import WarrantyPage from "./pages/Warranty";
import LinkTree from "./pages/LinkTree";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

import FcmAnalytics from './services/fcmAnalytics';
import QrScan from './pages/QrScan';

// Check if visited via the links subdomain
const isLinksSubdomain = window.location.hostname.startsWith('links.');

function AppContent() {
  const location = useLocation();

  // Hide footer on /links path or when accessing via links subdomain
  const hideFooter = location.pathname === "/links" || isLinksSubdomain;

  return (
    <>
      <FcmAnalytics />
      <Routes>
        {/* If user visits links.immunoplus.in, render LinkTree directly at root '/' */}
        <Route 
          path="/" 
          element={isLinksSubdomain ? <LinkTree /> : <Home />} 
        />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/team" element={<Team />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/links" element={<LinkTree />} />
        <Route path="/qrscan/:appname" element={<QrScan />} />

        {/* 404 Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Footer hidden on links page & subdomain */}
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
