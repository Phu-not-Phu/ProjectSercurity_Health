import "./home.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleGOClick = () => {
    navigate("../detail");
  };

  return (
    <div className="container">
      <div class="home">
        <div class="home-box">
          <h1>You have been scanned!</h1>
          <p>By our state of the art Space radar array.</p>
          <div class='radar-container'>        
            <div class='radar'>
              <div class='sweep'>
              </div>              
              <div class='ping-dot' style={{top: "64%", left: "64%", "--delay": 19}}></div>
              <div class='ping-dot' style={{top: "32%", left: "32%", "--delay": 44}}></div>
              <div class='ping-dot' style={{top: "25%", left: "75%", "--delay": 7}}></div>
              <div class='ping-dot' style={{top: "75%", left: "75%", "--delay": 19}}></div>
              <div class='ping-dot' style={{top: "75%", left: "25%", "--delay": 32}}></div>
            </div>
          </div>
          <button class="gotologin-button" onClick={handleGOClick}>Take a look.</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
