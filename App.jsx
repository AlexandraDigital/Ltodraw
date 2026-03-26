import React, { useState } from "react";
import CanvasPro from "./CanvasPro.jsx";
import AITutor from "./AITutor.jsx";
import UploadDrawing from "./UploadDrawing.jsx";

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🎨 AI Perspective Studio</h1>

      <CanvasPro />
      <UploadDrawing onFeedback={setFeedback} />

      {feedback && (
        <div>
          <h3>🧠 AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}

      <AITutor />
    </div>
  );
}