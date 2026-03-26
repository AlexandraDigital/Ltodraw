import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [lesson, setLesson] = useState(0);

  const lessons = [
    {
      title: "1-Point Perspective",
      content: "All lines go to one vanishing point. Try drawing a road or hallway."
    },
    {
      title: "2-Point Perspective",
      content: "Two vanishing points. Great for buildings and corners."
    },
    {
      title: "3-Point Perspective",
      content: "Adds depth vertically. Used for dramatic angles."
    }
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>🎨 Perspective Trainer</h1>
      <h2>{lessons[lesson].title}</h2>
      <p>{lessons[lesson].content}</p>

      <button onClick={() => setLesson((lesson + 1) % lessons.length)}>
        Next Lesson
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);