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
    ctx.fillStyle = "#2f7dff";
    ctx.fillRect(x - 3, y - 3, 6, 6);

    if (points.length > 0) {
      const vp = points[0];
      ctx.beginPath();
      ctx.strokeStyle = "#e91e63";
      ctx.lineWidth = 1.8;
      ctx.moveTo(x, y);
      ctx.lineTo(vp.x, vp.y);
      ctx.stroke();
    }
  };

  return (
    <section className="card">
      <h3>🎯 Perspective Trainer</h3>
      <p>Click once for a vanishing point, then place more points to draw guide lines.</p>
      <canvas
        ref={canvasRef}
        width={420}
        height={320}
        onClick={handleClick}
        className="canvas-pro"
      />
    </section>
  );
}
