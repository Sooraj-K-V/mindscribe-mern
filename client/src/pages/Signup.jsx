import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/register",
        userDetails
      );
      console.log(res.data);
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });
      console.error("Error:", err.response?.data || err.message);
      setErrorMessage(err.response?.data?.message || "Something went wrong");
      navigate("/signup");
    }
  };

  return (
    <div className="py-4 signup-container container">
      {/* <h2 className="m-2">Sign-Up</h2> */}
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          value={userDetails.name}
          onChange={handleChange}
        />
        <input
          type="text "
          placeholder="abc@example.com"
          name="email"
          id="email"
          value={userDetails.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
        />
        <div className="m-2 d-flex flex-column  justify-content-center align-items-center">
          <button type="submit">Sign-up</button>{" "}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <p className="p-0 m-0">or</p>
          <Link to="/login" className="text-white">
            login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
