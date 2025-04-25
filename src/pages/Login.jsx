import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
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

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div>
      <h1 className="text-center">Please login here</h1>
      <MDBContainer
        tag="form"
        onSubmit={handleLogin}
        className="p-3 my-5 d-flex flex-column w-50"
      >
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleOnChange}
          required
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleOnChange}
          required
        />

        {/* 👇 Compact Button */}
        <MDBBtn type="submit" className="mb-4" size="sm">
          Sign in
        </MDBBtn>

        <div className="text-center">
          <p>
            Not a member? <Link to="/register">Register</Link>
          </p>
          <p>or sign in with:</p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Login;
