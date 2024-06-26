import "./detail.css";
import Navbar from "../../components/navbar"
import SearchBar from "../../components/searchBar/searchBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Detail() {
  const [items, setItems] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null); // State to track hovered dot index

  const coordinatesArray = []; // Dùng mảng này để lưu tọa độ của các điểm trên page

  useEffect(() => {
    axios.get("http://localhost:8081/all").then((response) => {
      setItems(response.data);
    });
  }, []);

  // Duyệt qua mảng items để lấy tọa độ của các điểm
  items.forEach((item) => {
    const coordinates = item.cordinate.split(',');
    const lat = parseFloat(coordinates[0]);
    const long = parseFloat(coordinates[1]);
    coordinatesArray.push([lat, long]);
  });

  // Dùng hàm này để chuyển đổi số thập phân sang độ, phút, giây
  function decimalToDMS(decimal, isLatitude) {
    const direction = decimal >= 0 
      ? (isLatitude ? 'N' : 'E') 
      : (isLatitude ? 'S' : 'W');
    
    const absoluteDecimal = Math.abs(decimal);
    const degrees = Math.floor(absoluteDecimal);
    const minutesFloat = (absoluteDecimal - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60);
 
    return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
  }
  
  // Dùng hàm này để xử lý chuỗi tọa độ trả về từ API
  function processCoordinates(data) {
    const coordinates = data.split(',');
    const latDecimal = parseFloat(coordinates[0]);
    const longDecimal = parseFloat(coordinates[1]);
    
    const latDMS = decimalToDMS(latDecimal, true);
    const longDMS = decimalToDMS(longDecimal, false);
    
    return `${latDMS} ${longDMS}`;
  }

  // Dùng hàm này để xử lý góc quay trả về từ API
  function getCompassDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  // Dùng hàm này để chuyển đổi timestamp sang ngày giờ
  function getDateHourAndMinute(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');
  
    const formattedDate = `${hour}:${minute} ${day}/${month}/${year}`;
  
    return formattedDate;
  }

  // Dùng hàm này để hiển thị overlay
  const showOverlay = () => setOverlayVisible(true);
  const hideOverlay = () => setOverlayVisible(false);

  const handleMouseEnter = (index) => {
    setHoveredDot(index);
  };

  const handleMouseLeave = () => {
    setHoveredDot(null);
  };

  
  return (
    <div id="container">
      <Navbar onShowOverlay={showOverlay} />
      <div className="map">
        {coordinatesArray.map((coordinates, index) => {
            const x = (coordinates[1] + 180) * (100 / 360);
            const y = (100 - coordinates[0]) * (100 / 180);

            return (
              <div className="dot" key={index} style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => handleMouseEnter(index)} 
                onMouseLeave={handleMouseLeave}
              >
                <div className={`dropdown-content ${hoveredDot === index ? 'active' : ''}`}>
                  <p>Time: {getDateHourAndMinute(items[index].record_time)}</p>
                  <p>Alcohol Concentration: {items[index].alcohol_concentration}%</p>
                  <p>Temperature: {items[index].tempature}&deg;C</p>
                  <p>Speed: {items[index].speed_per_second} km/h</p>
                  <p>Heading: {getCompassDirection(items[index].heading)}</p>
                </div>
              </div>
            );
          })}
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <button className="close-button" onClick={hideOverlay}>X</button>
          <div className="overlay-content">
            <div id="demo-detail">

              <div id="searchBar">
                <SearchBar/>
              </div>

              <div id="contents">
                <div className="column0">ID</div>
                <div className="column1">Time</div>
                <div className="column2">Alcohol Concentration</div>
                <div className="column3">Temperature</div>
                <div className="column4">Coordinate</div>
                <div className="column5">Speed</div>
                <div className="column6">Heading</div>
              </div>
              <hr />
              <div id="details">
                {items.map((item) => (
                  <div id="detail" key={item.id}>
                    <p className="column0">{item.id}</p>
                    <p className="column1">{getDateHourAndMinute(item.record_time)}</p>
                    <p className="column2">{item.alcohol_concentration}%</p>
                    <p className="column3">{item.tempature}&deg;C</p>
                    <p className="column4">{processCoordinates(item.cordinate)}</p>
                    <p className="column5">{item.speed_per_second} km/h</p>
                    <p className="column6">{getCompassDirection(item.heading)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;