import React, { useMemo, useState } from "react";
import CanvasPro from "./CanvasPro.jsx";
import AITutor from "./AITutor.jsx";
import UploadDrawing from "./UploadDrawing.jsx";

const LESSONS = [
  {
    id: "one",
    title: "1-Point Perspective",
    focus: "Hallways, roads, and interiors facing straight ahead.",
    checks: [
      "Set one vanishing point on the horizon.",
      "Keep vertical edges straight up/down.",
      "Every depth edge should aim to the same vanishing point.",
    ],
  },
  {
    id: "two",
    title: "2-Point Perspective",
    focus: "Buildings viewed from a corner.",
    checks: [
      "Place two vanishing points far apart on one horizon.",
      "Use verticals for building corners.",
      "Send left/right depth edges to matching vanishing points.",
    ],
  },
  {
    id: "three",
    title: "3-Point Perspective",
    focus: "Looking up or down at tall forms.",
    checks: [
      "Start with two horizon vanishing points.",
      "Add a third vanishing point above or below.",
      "Avoid parallel verticals—aim them toward point three.",
    ],
  },
];

export default function App() {
  const [feedback, setFeedback] = useState("");
  const [activeLessonId, setActiveLessonId] = useState("one");

  const activeLesson = useMemo(
    () => LESSONS.find((lesson) => lesson.id === activeLessonId) || LESSONS[0],
    [activeLessonId]
  );

  return (
    <div className="app-shell">
      <h1 className="app-title">🎨 AI Perspective Studio</h1>
      <p className="app-subtitle">
        Build real perspective skill with guided drills, canvas coaching, and AI critique.
      </p>

      <section className="card lesson-card">
        <h3>🧭 Learning Roadmap</h3>
        <div className="lesson-tabs" role="tablist" aria-label="Perspective lesson types">
          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              type="button"
              role="tab"
              aria-selected={activeLesson.id === lesson.id}
              className={`lesson-tab ${activeLesson.id === lesson.id ? "is-active" : ""}`}
              onClick={() => setActiveLessonId(lesson.id)}
            >
              {lesson.title}
            </button>
          ))}
        </div>

        <p className="lesson-focus">{activeLesson.focus}</p>
        <ul className="check-list">
          {activeLesson.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
      </section>

      <div className="ui-grid">
        <CanvasPro lessonId={activeLesson.id} />
        <UploadDrawing lessonTitle={activeLesson.title} onFeedback={setFeedback} />
      </div>

      {feedback && (
        <div className="card feedback-card">
          <h3>🧠 AI Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}

      <AITutor lesson={activeLesson} />
    </div>
  );
}
