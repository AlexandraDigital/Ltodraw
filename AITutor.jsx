import React, { useState } from "react";

export default function AITutor() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I’m your AI drawing tutor. Ask anything about perspective." },
  ]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiMsg = { role: "ai", text: data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (_err) {
      setMessages((prev) => [...prev, { role: "ai", text: "⚠️ AI not connected." }]);
    }

    setInput("");
  };

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h3>🤖 AI Tutor</h3>

      <div className="tutor-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === "ai" ? "msg-ai" : "msg-user"}`}>
            <strong>{m.role === "ai" ? "AI" : "You"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="tutor-controls">
        <input
          className="tutor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about perspective..."
        />
        <button className="tutor-btn" onClick={send}>
          Send
        </button>
      </div>
    </section>
  );
}
