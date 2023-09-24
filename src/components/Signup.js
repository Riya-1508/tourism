import React from "react";
import "./Signup.css"; // Import your CSS file
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [nationality, setNationality] = useState("");
    const [gender, setGender] = useState("");
    const [mobileno, setMobileNo] = useState("");
    // const [error, setError] = useState(false);
    // const [latestError, setLatestError] = useState("");


    const submitHandler = async (e) => {
      e.preventDefault();
      if (password !== confirmpassword) {
        alert("Passwords Do not match", "error");
      } else {
       try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          //setLoading(true)
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/createUser",
            {
            name:name,
            address:address,
            nationality:nationality,
            gender:gender,
            mobileno:mobileno,
            email:email,
            password:password,
            confirmpassword:confirmpassword,
            },
            config
          );
          //    setLoading(false)

          console.log(data);
          localStorage.setItem("email", JSON.stringify(data));
          // Save the name to local storage or any other desired storage method

          // localStorage.setItem("regID", regId);
          // Redirect the user to the other form page
          // navigate("/Applicatioform");
        //   window.location = "/login";
        //   diffToast("Registered Successfully", "success");
        } catch (error) {
        //   if (
        //     email === "" ||
        //     regId === "" ||
        //     firstname === "" ||
        //     middlename === "" ||
        //     surname === "" ||
        //     phnNumber === "" ||
        //     password === ""
        //   ) {
        //     diffToast("Invalid Input", "error");
        //   } else {
        //     diffToast("User already exists", "error");
        //   }
        console.log(error)
        }
      }
    };


  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Visitor</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              name="name"
              value={name}
              required
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              value={address}
              required
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setNationality(e.target.value)}
              name="nationality"
              value={nationality}
              required
              placeholder="Nationality"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              value={gender}
              required
              placeholder="Gender"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setMobileNo(e.target.value)}
              name="mobileno"
              value={mobileno}
              required
              placeholder="Contact No"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              required
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmpassword"
              value={confirmpassword}
              required
              placeholder="Confirm Password"
            />
          </div>
          <button type="submit" onClick={submitHandler}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
