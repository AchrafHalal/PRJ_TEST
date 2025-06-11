import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      password,
      passwordConfirmation,
    } = formData;

    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/register", {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const loginRes = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const token = loginRes.data.token;
      const role = loginRes.data.user.role;

      localStorage.setItem("isAdmin", role === "admin" ? "admin" : "user");
      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const profileRes = await axios.get("http://localhost:8000/api/profile");
      const setupCompleted = profileRes.data?.profile?.setupCompleted;

      if (setupCompleted === false) {
        navigate("/init-form");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Full error:", err);
      const errorMsg = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(", ")
        : err.response?.data?.message ||
          "Registration failed. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup_page">
      <div className="signup-container">
        <div className="user-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="User Icon"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Normal Input */}
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            icon="https://cdn-icons-png.flaticon.com/512/3178/3178165.png"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input with Eye */}
          <div className="input-group" style={{ position: "relative" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              alt="Password icon"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }}
            />
            <img
              src={
                showPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159604.png"
                  : "https://cdn-icons-png.flaticon.com/512/159/159605.png"
              }
              alt="Toggle Password Visibility"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Confirm Password Input with Eye */}
          <div className="input-group" style={{ position: "relative" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              alt="Confirm Password icon"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
              style={{ paddingRight: "40px" }}
            />
            <img
              src={
                showConfirmPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159605.png"
                  : "https://cdn-icons-png.flaticon.com/512/159/159604.png"
              }
              alt="Toggle Confirm Password Visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </button>

          <div className="login-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
      <div className="back-to-home">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
};

// Normal Input without logic
const Input = ({ type, name, placeholder, icon, value, onChange }) => (
  <div className="input-group">
    <img src={icon} alt={`${name} icon`} />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Signup;
