import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import rateLimit from "express-rate-limit";
import chatConfig from "./chatConfig.js";

dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://aswinraj.dev",
      "https://www.aswinraj.dev",
    ],
  })
);

app.use(express.json());

/* =========================
   RATE LIMITING
========================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    reply: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    status: "online",
    service: "Jarvis API",
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "Backend working",
  });
});

/* =========================
   CHAT API
========================= */

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || !userMessage.trim()) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    console.log("User:", userMessage);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: chatConfig.model,
        messages: [
          {
            role: "system",
            content: chatConfig.systemPrompt,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL,
          "X-Title": "Jarvis",
        },
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "No response received";

    res.json({ reply });
  } catch (error) {
    console.error("===== OPENROUTER ERROR =====");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
    console.error("Message:", error.message);
    console.error("============================");

    res.status(500).json({
      reply:
        "Sorry, I'm temporarily unavailable. Please try again later.",
    });
  }
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});