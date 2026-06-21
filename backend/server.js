import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import chatConfig from "./chatConfig.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://aswinraj.dev",
      "https://www.aswinraj.dev",
      "https://portfolio-git-main-aswinrajkallils-projects.vercel.app",

    ],
  })
);
app.use(express.json());

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    reply: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

// temorarily for testing
app.get("/test", (req, res) => {
  res.json({
    message: "Backend working",
  });
});


app.post("/api/chat", async (req, res) => {
   console.log("Message:", req.body.message);
  try {
    const userMessage = req.body.message;

if (!userMessage || !userMessage.trim()) {
  return res.status(400).json({
    reply: "Message is required",
  });
}

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
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      reply: "Failed to get response from OpenRouter",
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});