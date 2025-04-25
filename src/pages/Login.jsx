import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Redux imports
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/slices/authSlice"; // ✅ Adjust path based on your project structure

const Login = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://full-stack-mern-app-backend.vercel.app/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      console.log("Login Successful:", response.data);
      dispatch(setAuth(response.data));
      alert("Login Successful!");
      Navigate("/");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Login Failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
    >
      <MDBCard
        className="shadow p-4"
        style={{
          maxWidth: "500px", // Reduce max-width for better alignment
          width: "100%",
          minHeight: "500px",
        }}
      >
        <MDBCardBody>
          <h3 className="text-center mb-4">Login to Your Account</h3>

          <form onSubmit={handleLogin} noValidate>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleOnChange}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleOnChange}
              required
            />

            <MDBBtn
              type="submit"
              className="w-100 mb-4"
              disabled={loading}
              style={{
                height: "45px", // Fixed height for the button
                display: "flex",
                alignItems: "center",
                justifyContent: "center", // Ensure content is centered horizontally and vertically
                textAlign: "center", // Ensures text is centered horizontally
                lineHeight: "normal", // Ensures vertical alignment
                padding: "0", // Remove any extra padding that may cause issues
              }}
            >
              {loading ? (
                <span className="d-flex justify-content-center align-items-center w-100">
                  <MDBIcon icon="spinner" spin className="me-2 text-center" />
                  Signing In...
                </span>
              ) : (
                "Login"
              )}
            </MDBBtn>
          </form>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
            <p>or sign in with:</p>

            <div className="d-flex justify-content-center">
              <MDBBtn
                tag="a"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="a"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
