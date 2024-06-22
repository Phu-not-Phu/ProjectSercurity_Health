import "./login.css";
import mail from "../icon/envelope-closed 1.svg";
import lock from "../icon/lock 1.svg";

import { useState, useEffect, useRef, useContext } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";

function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user_email, setEmail] = useState([""]);
  const [encrypted_password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user_email, encrypted_password]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/users/login",
        JSON.stringify({ user_email, encrypted_password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      // console.log(accessToken);

      setAuth({ user_email, encrypted_password, accessToken, refreshToken });
      console.log("Login user in login.js: " + user_email);
      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server is offline");
      } else if (err.response?.status === 400) {
        setErrMsg("Cannot find user");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Something went wrong");
      }
      errRef.current.focus();
    }
  };

  const handleRegisterClick = () => {
    navigate("../Register");
  };

  return (
    <div className="container">
      <div class="demo-login">
        <div class="demo-login-child">
          <b class="welcome-back">WELCOME BACK</b>
          <form onSubmit={submit}>
            <div class="email-input">
              <input
                class="input"
                type="text"
                placeholder="Email"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={user_email}
                required
              ></input>
              <img class="mail" alt="" src={mail}></img>
            </div>

            <div class="password-input">
              <input
                class="input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={encrypted_password}
                required
              ></input>
              <img class="lock" alt="" src={lock}></img>
            </div>

            <button class="signin-button" type="submit">
              Sign in
            </button>
          </form>
          <b class="forgot-password">Forgot password?</b>
          <b class="dont-have-account">
            <span class="dont-have-an-container1">
              <span class="register" onClick={handleRegisterClick}>
                Don’t have an account?{" "}
              </span>
            </span>
          </b>
        </div>
      </div>
    </div>
  );
}

export default Login;
