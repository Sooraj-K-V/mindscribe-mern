import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setUserDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.setItem("token", )
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/login",
        userDetails
      );
      console.log(res.data.token);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setUserDetails({
        email: "",
        password: "",
      });
      navigate("/dashboard")
    } catch (err) {
      setErrMsg(err.response?.data?.message);
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className="py-4 login-container container">
      {/* <h2 className='m-2'>Login</h2> */}
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <input
          type="text "
          placeholder="abc@example.com"
          name="email"
          id="email"
          onChange={handleChange}
          value={userDetails.email}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={userDetails.password}
        />
        <div className="m-2 d-flex flex-column  justify-content-center align-items-center">
          <button type="submit">Login</button>
          <p className="p-0 m-0">or</p>
          <Link to="/signup" className="text-white">
            sign-up
          </Link>
          {errMsg && <p>{errMsg}</p>}
        </div>
      </form>
    </div>
  );
}

export default Login;
