import "./home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Radar from "../../components/radar";

function Home() {
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
              <div class='ping-dot' id="dot1"></div>
              <div class='ping-dot' id="dot2"></div>
              <div class='ping-dot' id="dot3"></div>
            </div>
          </div>
          <button class="gotologin-button">More detail</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
