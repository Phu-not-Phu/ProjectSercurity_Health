import "./detail.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import InfiniteScroll from 'react-infinite-scroller';

function Detail(){
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.56.1:8081/all")
      .then((response) => {
        setItems(response.data);
      });
  }, []);

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
  
  
  return (
    <div id="container">
        <div id="demo-detail">

          {/* Nay là hàng chữ nội dung á (record_time đồ)     */}
          <div id="contents">
            <div class="column1">Time</div>
            <div class="column2">Alcohol Concentration</div>
            <div class="column3">Temperature</div>
            <div class="column4">Cordinate</div>
            <div class="column5">Speed</div>
            <div class="column6">Heading</div>
          </div>

          <hr></hr> {/*Này là cái đường kẻ thẳng á, <hr> á*/}
          
          {/*Còn mấy cái div dưới là mấy cái ô hiển thị thông tin xuất ra*/}

          <div id ="details">
            {items.map((item) => (  
              <div id="detail">
                <p class="column1">{item.record_time}</p>
                <p class="column2">{item.alcohol_concentration}%</p>
                <p class="column3">{item.tempature}&deg;C</p>
                <p class="column4">{processCoordinates(item.cordinate)}</p>
                <p class="column5">{item.speed_per_second} km/h</p>
                <p class="column6">{getCompassDirection(item.heading)}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Detail;
