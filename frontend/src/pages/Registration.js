import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Registration.css";
import logo from "../Images/plantiction.png";

function Registration() {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    UserName: "",
    Email: "",
    MobileNo: "",
    Npassword: "",
    Cpassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.Npassword !== formData.Cpassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        UserName: formData.UserName,
        Email: formData.Email,
        MobileNo: formData.MobileNo,
        Npassword: formData.Npassword,
        Cpassword : formData.Cpassword

      });

      setSuccess("Account Created Successfully!");
      setError("");
      alert("Account Created Successfully!");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-left-side">
          <p>Welcome to our<br />website</p>
        </div>

        <div className="registration-content-side">
          <div className="registration-heading">
            <img src={logo} alt="AgZone" title="AgZone" />
          </div>

          <div className="registration-sub-heading">
            <p>Create Your Free Account</p>
          </div>

          {error && <div className="registration-error-message">{error}</div>}
          {success && <div className="registration-success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="registration-form">
            <label htmlFor="UserName">Username</label>
            <input
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              placeholder="Sample852#"
              required
            />

            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Example@email.com"
              required
            />

            <label htmlFor="MobileNo">Mobile No</label>
            <input
              type="tel"
              name="MobileNo"
              value={formData.MobileNo}
              onChange={handleChange}
              placeholder="07########"
              required
            />

            <label htmlFor="Npassword">New Password</label>
            <input
              type="password"
              name="Npassword"
              value={formData.Npassword}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />

            <label htmlFor="Cpassword">Confirm Password</label>
            <input
              type="password"
              name="Cpassword"
              value={formData.Cpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />

            <input type="submit" value="Create your account" />
          </form>

          <div className="registration-sign-in-option">
            <p>
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
