import React, { useEffect, useMemo, useRef, useState } from "react";

const WIDTH = 680;
const HEIGHT = 420;
const MODE_TO_VP_COUNT = {
  one: 1,
  two: 2,
  three: 3,
};

const MODE_LABEL = {
  one: "1-Point",
  two: "2-Point",
  three: "3-Point",
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function drawGrid(ctx) {
  ctx.save();
  ctx.strokeStyle = "rgba(60, 95, 185, 0.2)";
  ctx.lineWidth = 1;

  for (let x = 40; x < WIDTH; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, HEIGHT);
    ctx.stroke();
  }

  for (let y = 40; y < HEIGHT; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }

  ctx.restore();
}

export default function CanvasPro({ lessonId = "one" }) {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState(lessonId);
  const [showGrid, setShowGrid] = useState(true);
  const [vanishingPoints, setVanishingPoints] = useState([]);
  const [practicePoints, setPracticePoints] = useState([]);

  useEffect(() => {
    setMode(lessonId);
    setVanishingPoints([]);
    setPracticePoints([]);
  }, [lessonId]);

  const requiredVpCount = MODE_TO_VP_COUNT[mode] ?? 1;

  useEffect(() => {
    setVanishingPoints([]);
    setPracticePoints([]);
  }, [mode]);

  const progressLabel = useMemo(() => {
    if (vanishingPoints.length < requiredVpCount) {
      return `Step 1: Place ${requiredVpCount - vanishingPoints.length} more vanishing point${
        requiredVpCount - vanishingPoints.length === 1 ? "" : "s"
      }.`;
    }

    if (practicePoints.length === 0) {
      return "Step 2: Click anywhere to add forms and auto-draw guides.";
    }

    return `Great progress — ${practicePoints.length} practice point${
      practicePoints.length === 1 ? "" : "s"
    } placed.`;
  }, [practicePoints.length, requiredVpCount, vanishingPoints.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, "#f8fbff");
    gradient.addColorStop(1, "#eef2ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (showGrid) drawGrid(ctx);

    ctx.save();
    ctx.strokeStyle = "rgba(22, 49, 112, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    const horizonY = vanishingPoints[0]?.y ?? HEIGHT / 2;
    ctx.beginPath();
    ctx.moveTo(0, horizonY);
    ctx.lineTo(WIDTH, horizonY);
    ctx.stroke();
    ctx.restore();

    practicePoints.forEach((point) => {
      vanishingPoints.forEach((vp, index) => {
        if (mode === "one" && index > 0) return;
        if (mode === "two" && index > 1) return;

        ctx.beginPath();
        ctx.strokeStyle = index === 2 ? "#ef4444" : "#2563eb";
        ctx.lineWidth = 1.6;
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(vp.x, vp.y);
        ctx.stroke();
      });

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(point.x - 3, point.y - 3, 6, 6);
    });

    vanishingPoints.forEach((vp, index) => {
      ctx.beginPath();
      ctx.fillStyle = index === 2 ? "#ef4444" : "#2563eb";
      ctx.arc(vp.x, vp.y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.fillText(`VP${index + 1}`, vp.x - 9, vp.y + 4);
    });
  }, [mode, practicePoints, showGrid, vanishingPoints]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, WIDTH);
    const y = clamp(event.clientY - rect.top, 0, HEIGHT);

    if (vanishingPoints.length < requiredVpCount) {
      setVanishingPoints((prev) => [...prev, { x, y }]);
      return;
    }

    setPracticePoints((prev) => [...prev, { x, y }]);
  };

  const undoLast = () => {
    if (practicePoints.length > 0) {
      setPracticePoints((prev) => prev.slice(0, -1));
      return;
    }

    if (vanishingPoints.length > 0) {
      setVanishingPoints((prev) => prev.slice(0, -1));
    }
  };

  const resetCanvas = () => {
    setPracticePoints([]);
    setVanishingPoints([]);
  };

  return (
    <section className="card">
      <h3>🎯 Perspective Trainer</h3>
      <p className="helper-text">
        Mode: <strong>{MODE_LABEL[mode]}</strong>. Place vanishing points first, then click to create
        guide rays for your box sketches.
      </p>

      <div className="canvas-controls">
        <label>
          Mode
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="one">1-Point</option>
            <option value="two">2-Point</option>
            <option value="three">3-Point</option>
          </select>
        </label>

        <label className="checkbox-label">
          <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
          Show grid
        </label>

        <button type="button" className="tutor-btn ghost-btn" onClick={undoLast}>
          Undo
        </button>
        <button type="button" className="tutor-btn ghost-btn" onClick={resetCanvas}>
          Reset
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        onClick={handleCanvasClick}
        className="canvas-pro"
      />

      <p className="progress-note">{progressLabel}</p>
    </section>
  );
}
