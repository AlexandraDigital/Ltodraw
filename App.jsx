import React, { useState } from "react";
import CanvasPro from "./CanvasPro.jsx";
import AITutor from "./AITutor.jsx";
import UploadDrawing from "./UploadDrawing.jsx";

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="app-shell">
      <h1 className="app-title">🎨 AI Perspective Studio</h1>
      <p className="app-subtitle">Train perspective skills with a bold red-and-blue interface.</p>

      <div className="ui-grid">
        <CanvasPro />
        <UploadDrawing onFeedback={setFeedback} />
      </div>

      {feedback && (
        <div className="card feedback-card">
          <h3>🧠 AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}

      <AITutor />
    </div>
  );
}
