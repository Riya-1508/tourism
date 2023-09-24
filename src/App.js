import React, { Component } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavbarMain from "./components/Navbar";
import Home from "./pages/Home";
import Tour from "./pages/Tour";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
       
      </Routes>
    </>
  );
}

export default App;
