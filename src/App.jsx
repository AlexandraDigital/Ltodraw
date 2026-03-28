import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);

  const lessons = [
    {
      title: "Draw a Face",
      video: "https://www.youtube.com/embed/wAOldLWIDSM",
      steps: ["Draw a circle", "Add eyes", "Draw mouth"]
    },
    {
      title: "Draw Anime",
      video: "https://www.youtube.com/embed/2Vv-BfVoq4g",
      steps: ["Outline head", "Draw hair", "Add details"]
    }
  ];

  const current = lessons[0];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Canvas Side */}
      <div style={{ flex: 2, borderRight: "1px solid #ccc" }}>
        <h2 style={{ padding: "10px" }}>Your Canvas</h2>
        <canvas
          width={500}
          height={500}
          style={{ border: "1px solid black", margin: "10px" }}
        />
      </div>

      {/* Video + Steps Side */}
      <div style={{ flex: 1, padding: "10px" }}>
        <h2>{current.title}</h2>

        <iframe
          width="100%"
          height="200"
          src={current.video}
          title="Tutorial"
          allowFullScreen
        />

        <div style={{ marginTop: "20px" }}>
          <h3>Step {step + 1}</h3>
          <p>{current.steps[step]}</p>

          <button
            onClick={() => setStep((s) => Math.min(s + 1, current.steps.length - 1))}
            style={{ padding: "10px", marginRight: "10px" }}
          >
            Next
          </button>

          <button
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            style={{ padding: "10px" }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
