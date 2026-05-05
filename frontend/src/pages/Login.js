import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Login.css";  
import logo from "../Images/plantiction.png";

function Login() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
  //     // Save token in localStorage
  //     localStorage.setItem("token", response.data.token);

  //     setSuccess("Login Successful!");
  //     setError("");
  //     alert("Login Successful!");

  //     // Redirect to dashboard/home page
  //     navigate("/");
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Login failed!");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      // ✅ Save token & user in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
  
      setSuccess("Login Successful!");
      setError("");
      alert("Login Successful!");
  
      // Redirect to home or dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };
  

  return (
    <div className="login-page">
      <div className="container">
        <div className="image-side"></div>
        <div className="content-side">
          <div className="login-heading">
            <img src={logo} alt="Logo" />
          </div>
          <h2 id="sub-heading-1">Welcome Back</h2>
          <p id="sub-heading-2">Sign in to continue</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form className="form" onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="Email"
              className="username"
              placeholder="Enter email"
              value={formData.Email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="Password"
              className="Password"
              placeholder="Enter password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            
            <div className="rememberme">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="submit">Login</button>
          </form>

          <p id="footer" onClick={() => navigate('/create-account')}>
            Don't have an account? <a href="#">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
