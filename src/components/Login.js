import React from "react";
import "./Login.css"; // Import your CSS file
import { useState, useEffect } from "react";
import axios from "axios";
// import ErrorMessage from "./ErrorMesssge";
import { Link } from "react-router-dom";
import { json } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
function Login() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
         
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email,
              password,
            },
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          // setLoading(false);
          // diffToast("Login Successful", "success");
          window.location = "/";
        } catch (error) {
         console.log(error);
          // setLoading(false);
          // //    alert("Invalid Credentials")
          // diffToast("Invalid Credentials", "error");
        }
      };
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Log In</h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" onClick={submitHandler}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
