import React, { useState } from "react";
import CanvasPro from "./CanvasPro.jsx";
import AITutor from "./AITutor.jsx";
import UploadDrawing from "./UploadDrawing.jsx";

const appStyle = {
  minHeight: "100vh",
  padding: 24,
  fontFamily: "Inter, system-ui, sans-serif",
  background: "linear-gradient(135deg, #0f1f48 0%, #1f4f9b 55%, #a1172f 100%)",
  color: "#f8fbff",
};

const panelStyle = {
  maxWidth: 880,
  margin: "0 auto",
  backgroundColor: "rgba(10, 23, 55, 0.86)",
  border: "1px solid rgba(125, 178, 255, 0.5)",
  borderRadius: 16,
  boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
  padding: 24,
};

const feedbackStyle = {
  marginTop: 20,
  padding: 14,
  borderRadius: 12,
  border: "1px solid rgba(255, 123, 154, 0.75)",
  backgroundColor: "rgba(139, 18, 48, 0.35)",
};

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <div style={appStyle}>
      <div style={panelStyle}>
        <h1 style={{ marginTop: 0, color: "#d8e8ff" }}>🎨 AI Perspective Studio</h1>

        <CanvasPro />
        <UploadDrawing onFeedback={setFeedback} />

        {feedback && (
          <div style={feedbackStyle}>
            <h3 style={{ marginTop: 0, color: "#ffd5df" }}>🧠 AI Feedback</h3>
            <p style={{ marginBottom: 0 }}>{feedback}</p>
          </div>
        )}

        <AITutor />
      </div>
    </div>
  );
}
