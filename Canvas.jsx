import React, { useRef, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  const startDraw = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDraw = () => setDrawing(false);

  return (
    <div>
      <h3>✏️ Practice Canvas</h3>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: "1px solid black" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
      />
    </div>
  );
}