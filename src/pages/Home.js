import React, { Component } from "react";
import "../App.css";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import About from "../components/About";
import Package from "../components/Package";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
// import Signup from "../components/Signup";
import Login  from "../components/Login";
class Home extends Component {
  render() {
    return (
      <div id="home">
        <Navbar />
        <Login/>
        <Hero />
        <About />
        <Package />
        <Services />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default Home;
