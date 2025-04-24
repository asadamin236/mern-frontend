import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const Navigate = useNavigate();
  const [value, setValue] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/register",
        value
      );
      console.log("Registration Successful:", response.data);
      alert("Registration Successful! Redirecting to login...");
      // Optional: Redirect to login
      // window.location.href = "/login";
      Navigate("/login");
    } catch (error) {
      console.error(
        "Registration Failed:",
        error.response?.data || error.message
      );
      alert("Registration Failed! Check console for details.");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4">Please Register Here</h1>
      <MDBContainer
        tag="form"
        className="p-3 my-5 d-flex flex-column w-50"
        onSubmit={handleSubmit}
      >
        <MDBInput
          wrapperClass="mb-4"
          label="User Name"
          id="userNameInput"
          type="text"
          name="userName"
          value={value.userName}
          onChange={handleOnChange}
          required
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="emailInput"
          type="email"
          name="email"
          value={value.email}
          onChange={handleOnChange}
          required
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="passwordInput"
          type="password"
          name="password"
          value={value.password}
          onChange={handleOnChange}
          required
        />

        <MDBBtn type="submit" className="mb-4">
          Sign up
        </MDBBtn>

        <div className="text-center">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p>or sign up with:</p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="button"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="button"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="button"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="button"
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

export default Register;
