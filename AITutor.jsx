import React, { useState } from "react";

export default function AITutor() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I’m your drawing tutor. Ask me anything about perspective." }
  ]);
  const [input, setInput] = useState("");

  const respond = (text) => {
    let reply = "Try focusing on your vanishing points.";

    if (text.toLowerCase().includes("1 point")) {
      reply = "In 1-point perspective, all lines go to a single vanishing point on the horizon.";
    } else if (text.toLowerCase().includes("2 point")) {
      reply = "In 2-point perspective, objects turn and use two vanishing points.";
    } else if (text.toLowerCase().includes("3 point")) {
      reply = "3-point adds a vertical vanishing point for dramatic depth.";
    }

    return reply;
  };

  const send = () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    const aiMsg = { role: "ai", text: respond(input) };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>🤖 AI Tutor</h3>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 200, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{m.role === "ai" ? "AI" : "You"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about perspective..."
        style={{ width: "80%" }}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}