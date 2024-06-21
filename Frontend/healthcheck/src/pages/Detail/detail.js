import "./detail.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import InfiniteScroll from 'react-infinite-scroller';

function Detail(){
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.0.104:8081/all")
      .then((response) => {
        setItems(response.data);
      });
  }, []);

  

  
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
                <p class="column2">{item.alcohol_concentration}</p>
                <p class="column3">{item.tempature}</p>
                <p class="column4">{item.cordinate}</p>
                <p class="column5">{item.speed_per_second}</p>
                <p class="column6">{item.heading}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
}

export default Detail;
