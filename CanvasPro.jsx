import React, { useRef, useState } from "react";

export default function CanvasPro() {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPoints((prev) => [...prev, { x, y }]);

    const ctx = canvasRef.current.getContext("2d");

    // draw point
    ctx.fillRect(x - 3, y - 3, 6, 6);

    // draw perspective lines to first point (vanishing point)
    if (points.length > 0) {
      const vp = points[0];
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vp.x, vp.y);
      ctx.stroke();
    }
  };

  return (
    <div>
      <h3>🎯 Perspective Trainer</h3>
      <p>Click to place vanishing point, then click to draw lines toward it.</p>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onClick={handleClick}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
}