import React, { useMemo, useState } from "react";

export default function AITutor({ lesson }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi, I’m your AI drawing tutor. Ask anything about perspective." },
  ]);
  const [input, setInput] = useState("");

  const quickPrompts = useMemo(
    () => [
      `Give me a 15-minute ${lesson.title} practice routine.`,
      `How do I find mistakes fast in ${lesson.title}?`,
      "Give me one box drill and one environment drill for today.",
    ],
    [lesson.title]
  );

  const send = async (draft) => {
    const nextInput = draft ?? input;
    if (!nextInput.trim()) return;

    const userMsg = { role: "user", text: nextInput };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: nextInput }),
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
    <section className="card tutor-card">
      <h3>🤖 AI Tutor</h3>
      <p className="helper-text">Current lesson: {lesson.title}</p>

      <div className="quick-prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} className="chip-btn" type="button" onClick={() => send(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

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
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Ask about perspective..."
        />
        <button className="tutor-btn" onClick={() => send()}>
          Send
        </button>
      </div>
    </section>
  );
}
