import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");

      if (rememberMe) {
        localStorage.setItem("user_email", email);
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;

        if (
          status === 403 &&
          message === "Your account has been deactivated."
        ) {
          setError(
            "Your account has been deactivated. Please contact support."
          );
        } else if (status === 401) {
          setError("Incorrect password. Please try again.");
        } else if (status === 422) {
          setError("Validation error. Please fill in all fields correctly.");
        } else {
          setError(message || "Login failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
 <div className="login-page">
      <div className="login-container">
        <div className="user-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
            alt="User Icon"
          />
        </div>

        {error && (
          <Alert severity="error" style={{ marginBottom: "10px" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div
            className="options"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            <label style={{ display: "block", marginBottom: "4px" }}>
              Login as:
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={!isAdmin}
                  onChange={() => setIsAdmin(false)}
                />{" "}
                User
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(true)}
                />{" "}
                Admin
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3178/3178165.png"
              alt="Email Icon"
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group" style={{ position: "relative" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png"
              alt="Lock Icon"
              style={{ width: 20, height: 20 }}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <img
              src={
                showPassword
                  ? "https://cdn-icons-png.flaticon.com/512/159/159605.png" // eye open icon
                  : "https://cdn-icons-png.flaticon.com/512/159/159604.png" // eye closed icon
              }
              alt="Toggle Password Visibility"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
            />
          </div>

          {/* Remember Me */}
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div className="signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </div>
        </form>
      </div>
      <div className="back-to-home">
        <a href="/">← Back to Home</a>
      </div>
    </div>
  );
};

export default Login;
