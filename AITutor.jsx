import React, { useState } from "react";

const INITIAL_MESSAGE = {
  role: "ai",
  text: "Hi, I’m your AI drawing tutor. Ask anything about perspective.",
};

export default function AITutor() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const send = async () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    setIsSending(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmedInput }]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.reply || `Request failed with status ${res.status}`);
      }

      const reply = typeof data.reply === "string" ? data.reply : "I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `⚠️ ${err.message || "AI tutor is unavailable right now."}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      style={{
        marginTop: 24,
        padding: 14,
        borderRadius: 12,
        border: "1px solid rgba(255, 134, 165, 0.5)",
        backgroundColor: "rgba(133, 19, 51, 0.35)",
      }}
    >
      <h3 style={{ color: "#ffd2dd", marginTop: 0 }}>🤖 AI Tutor</h3>

      <div
        style={{
          border: "1px solid rgba(121, 192, 255, 0.5)",
          borderRadius: 10,
          backgroundColor: "rgba(12, 34, 80, 0.75)",
          padding: 12,
          height: 220,
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} style={{ marginBottom: 8, color: "#f5f8ff" }}>
            <strong style={{ color: m.role === "ai" ? "#84cfff" : "#ff9cb4" }}>
              {m.role === "ai" ? "AI" : "You"}:
            </strong>{" "}
            {m.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send();
            }
          }}
          placeholder="Ask about perspective..."
          style={{
            flex: 1,
            borderRadius: 8,
            border: "1px solid rgba(130, 196, 255, 0.65)",
            padding: "10px 12px",
            backgroundColor: "rgba(17, 43, 95, 0.85)",
            color: "#f8fbff",
          }}
          disabled={isSending}
        />
        <button
          onClick={send}
          disabled={isSending}
          style={{
            border: "1px solid rgba(255, 159, 185, 0.9)",
            backgroundColor: "#bc2f57",
            color: "#fff",
            borderRadius: 8,
            padding: "10px 14px",
            cursor: isSending ? "not-allowed" : "pointer",
          }}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
