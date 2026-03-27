import React, { useState } from "react";

export default function UploadDrawing({ lessonTitle, onFeedback }) {
  const [focus, setFocus] = useState("line_accuracy");
  const focusLabel = focus.split("_").join(" ");

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64 = reader.result;

        const res = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `You're coaching my ${lessonTitle} study. Focus this critique on ${focusLabel}. Give 3 strengths, 3 fixes, and one 10-minute drill.`,
            image: base64,
          }),
        });

        if (!res.ok) {
          throw new Error(`Upload request failed with ${res.status}`);
        }

        const data = await res.json();
        onFeedback(data.reply || "I couldn't generate feedback right now.");
      } catch (_err) {
        onFeedback("⚠️ I couldn't analyze this upload right now. Please try again.");
      }
    };

    reader.onerror = () => {
      onFeedback("⚠️ I couldn't read that file. Please try a different image.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className="card">
      <h3>🖼️ Upload Drawing</h3>
      <p>Upload a perspective sketch and get lesson-aware critique.</p>

      <label className="upload-focus">
        Critique focus
        <select value={focus} onChange={(e) => setFocus(e.target.value)}>
          <option value="line_accuracy">Line accuracy</option>
          <option value="depth_consistency">Depth consistency</option>
          <option value="composition">Composition & readability</option>
        </select>
      </label>

      <input className="file-input" type="file" accept="image/*" onChange={handleUpload} />
    </section>
  );
}
