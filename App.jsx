import React, { useState } from "react";
import Canvas from "./Canvas.jsx";
import AITutor from "./AITutor.jsx";

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🎨 AI Perspective Trainer</h1>

      <Canvas />
      <AITutor />

      {feedback && (
        <div>
          <h3>🧠 AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}