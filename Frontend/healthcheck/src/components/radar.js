import React, { useEffect, useRef, useState } from 'react';
import './radar.css';

const Radar = () => {
  const radarRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    const generateRandomDots = () => {
      const newDots = Array.from({ length: 3 }).map(() => {
        const top = Math.random() * 95;
        const left = Math.random() * 95;
        return { top, left, active: false };
      });
      setDots(newDots);
    };

    generateRandomDots();
  }, []);

  useEffect(() => {
    const sweep = document.querySelector('.sweep');
    let angle = 0;

    const checkCollision = (dot) => {
      const radarRect = radarRef.current.getBoundingClientRect();
      const dotX = dot.left / 100 * radarRect.width;
      const dotY = dot.top / 100 * radarRect.height;

      const dotAngle = Math.atan2(dotY - radarRect.height / 2, dotX - radarRect.width / 2) * (180 / Math.PI);

      return (dotAngle >= angle - 1 && dotAngle <= angle + 1);
    };
  }, []);

  return (
    <div className="radar-container">
      <div className="radar" ref={radarRef}>
        <div className="sweep" style={{ transform: `rotate(${sweepAngle}deg)` }}></div>
        {dots.map((dot, index) => (
          <div
            key={index}
            className="ping-dot"
            style={{
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              boxShadow: dot.active ? '0 0 4px 4px rgba(0, 204, 255, 0.589)' : '',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Radar;
