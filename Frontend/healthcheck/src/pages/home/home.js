import "./home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  return (
    <div className="container">
      <div class="home">
        <div class="home-box">
          <h1>You have been scanned!</h1>
          <p>Health Check is a web application that helps you to monitor your health.</p>
          <div class='radar-container'>        
            <div class='radar'>
              <div class='sweep'></div>
              <div class='ping-dot' id="dot1"></div>
              <div class='ping-dot' id="dot2"></div>
              <div class='ping-dot' id="dot3"></div>
            </div>
          </div>
          <p>Click on the links above to get started!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
