import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

function Home() {
  const [authenticated, setAuthenticated] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/protected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthenticated(true);
        navigate("/dashboard");
      } catch (error) {
        console.error(error?.res?.data?.message);
        setErrMsg(error?.res?.data?.message);
      }
    };
    verifyUser();
  }, []);

  return (
    <div className="home-container">
      <h1 className="text-center">Welcome to MindScribe</h1>
      <div className="log-sign m-5 p-2">
        <Link to={"/signup"}>
          <button>Sign-Up</button>
        </Link>
        <p className="text-center m-2">or</p>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
      <div className="p-div">
        <h2>Why Use MindScribe?</h2>
        <p className="text-center m-2">
          Reflect on your day and track your thoughts, enjoy 100% privacy and
          security, and build a consistent writing habit with ease.
        </p>
      </div>
    </div>
  );
}

export default Home;
