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

    ctx.fillStyle = "#ff4d6d";
    ctx.fillRect(x - 3, y - 3, 6, 6);

    if (points.length > 0) {
      const vp = points[0];
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vp.x, vp.y);
      ctx.strokeStyle = "#5db5ff";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <h3 style={{ color: "#8fd0ff", marginBottom: 8 }}>🎯 Perspective Trainer</h3>
      <p style={{ marginTop: 0, color: "#d5e7ff" }}>
        Click to place a vanishing point, then click to draw guide lines toward it.
      </p>
      <canvas
        ref={canvasRef}
        width={340}
        height={280}
        onClick={handleClick}
        style={{
          border: "2px solid #69b9ff",
          borderRadius: 12,
          background: "radial-gradient(circle at top, #183d80 0%, #0b1f4f 100%)",
          boxShadow: "inset 0 0 22px rgba(86, 158, 255, 0.25)",
        }}
      />
    </div>
  );
}
