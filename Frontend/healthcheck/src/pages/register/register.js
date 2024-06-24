import "./register.css";
import mail from "../icon/envelope-closed 1.svg";
import lock from "../icon/lock 1.svg";
import name from "../icon/nameBadge.svg";
import age from "../icon/age.svg";
import height from "../icon/height.svg";
import weight from "../icon/weight.svg";

import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function Register() {
  const [user_email, setEmail] = useState("");
  const [encrypted_password, setPassword] = useState("");
  const [navigate, setNavaigate] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const respone = await axios.post("http://localhost:8000/users/register", {
      user_email,
      encrypted_password,
    });
    console.log(respone.data);

    setNavaigate(true);
  };
  const navigateHome = useNavigate();

  const handleLoginClick = () => {
    navigateHome("/login");
  };
  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div class="register2">
        <div class="login-box">
          <div class="login-box-child">
            <b class="create-account">CREATE ACCOUNT</b>
            <form onSubmit={submit}>
              <div class="inputs1">
                <div class="box">
                  <input
                    class="input2"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <img class="mail2" alt="" src={mail}></img>
                </div>

                <div class="box">
                  <input class="input2" placeholder="Your age"></input>
                  <img class="age" alt="" src={age}></img>
                </div>

                <div class="box">
                  <input
                    class="input2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <img class="lock2" alt="" src={lock}></img>
                </div>

                <div class="box">
                  <input class="input2" placeholder="Your height"></input>
                  <img class="height-icon" alt="" src={height}></img>
                </div>


                <div class="box">
                  <input class="input2" placeholder="Your name"></input>
                  <img class="name" alt="" src={name}></img>
                </div>          
                
                <div class="box">
                  <input class="input2" placeholder="Your weight"></input>
                  <img class="weight" alt="" src={weight}></img>
                </div>

              </div>
              <div class="sign-in">
                <button class="signup-button" type="submit">Sign up</button>
              </div>
            </form>
            <b class="already-have-an-container">
                <span class="login" onClick={handleLoginClick}>Already have an account? </span>
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
