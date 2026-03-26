import React from "react";

export default function UploadDrawing({ onFeedback }) {
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
            message: "Give feedback on my perspective drawing",
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
    <div>
      <h3>🖼️ Upload Drawing</h3>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
}
