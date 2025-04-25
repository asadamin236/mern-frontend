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

const Register = () => {
  const Navigate = useNavigate();
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://full-stack-mern-app-backend.vercel.app/auth/register",
        value
      );
      console.log("Registration Successful:", response.data);
      alert("Registration Successful! Redirecting to login...");
      Navigate("/login");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );
      alert("Registration Failed! Check console for details.");
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
        style={{ maxWidth: "500px", width: "100%", minHeight: "550px" }}
      >
        <MDBCardBody>
          <h3 className="text-center mb-4">Create Account</h3>

          <form onSubmit={handleSubmit} noValidate>
            <MDBInput
              wrapperClass="mb-4"
              label="User Name"
              type="text"
              name="userName"
              value={value.userName}
              onChange={handleOnChange}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              type="email"
              name="email"
              value={value.email}
              onChange={handleOnChange}
              required
            />

            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              type="password"
              name="password"
              value={value.password}
              onChange={handleOnChange}
              required
            />

            <MDBBtn
              type="submit"
              className="w-100 mb-4"
              disabled={loading}
              style={{ height: "45px" }} // Keep height fixed
            >
              {loading ? (
                <span>
                  <MDBIcon icon="spinner" spin className="me-2" />
                  Sign Up
                </span>
              ) : (
                "Sign Up"
              )}
            </MDBBtn>
          </form>

          <div className="text-center">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
            <p>or sign up with:</p>

            <div className="d-flex justify-content-center">
              <MDBBtn
                tag="button"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="button"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="button"
                color="none"
                className="mx-2"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>
              <MDBBtn
                tag="button"
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

export default Register;

