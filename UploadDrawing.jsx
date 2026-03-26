import React from "react";

export default function UploadDrawing({ onFeedback }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64 = reader.result;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Give feedback on my perspective drawing",
          image: base64
        })
      });

      const data = await res.json();
      onFeedback(data.reply);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3>🖼️ Upload Drawing</h3>
      <input type="file" onChange={handleUpload} />
    </div>
  );
}