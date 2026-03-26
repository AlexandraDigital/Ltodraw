// Simple Express backend for real AI tutor
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  const { message } = req.body;

  // For now, simulate smarter AI
  let reply = "Think about where your lines converge.";

  if (message.toLowerCase().includes("horizon")) {
    reply = "The horizon line represents your eye level. All vanishing points sit on it.";
  } else if (message.toLowerCase().includes("vanishing")) {
    reply = "Vanishing points are where parallel lines appear to meet in the distance.";
  } else if (message.toLowerCase().includes("box")) {
    reply = "Start with a front edge, then connect corners to vanishing points to build a box.";
  }

  res.json({ reply });
});

app.listen(3001, () => {
  console.log("AI server running on http://localhost:3001");
});