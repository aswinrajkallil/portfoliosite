import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import "./Chatbot.css";

function BotMessage({ text }) {
  const lines = text
    .split(/\n|•/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <ul className="bot-list">
      {lines.map((line, index) => (
        <li key={index}>
          {line.replace(/\*\*/g, "")}
        </li>
      ))}
    </ul>
  );
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        sender: "bot",
        text:
          "• Hello, I'm Jarvis.\n• Ask me anything about Aswin Raj K C.",
      },
    ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const currentMessage = input.trim();

    const userMessage = {
      sender: "user",
      text: currentMessage,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data =
        await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data.reply ||
            "No response received.",
        },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "• Sorry, something went wrong.\n• Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() =>
          setOpen(!open)
        }
      >
        {open ? (
          <FaTimes />
        ) : (
          <FaRobot />
        )}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>JARVIS AI</h4>
            <span>
              Portfolio Assistant
            </span>
          </div>

          <div className="chatbot-messages">
            {messages.map(
              (msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender ===
                    "user"
                      ? "user-message"
                      : "bot-message"
                  }
                >
                  {msg.sender ===
                  "bot" ? (
                    <BotMessage
                      text={msg.text}
                    />
                  ) : (
                    msg.text
                  )}
                </div>
              )
            )}

            {loading && (
              <div className="bot-message">
                <div className="typing">
                  Thinking...
                </div>
              </div>
            )}

            <div
              ref={messagesEndRef}
            />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask about Aswin..."
              value={input}
              disabled={loading}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
            />

            <button
              onClick={
                sendMessage
              }
              disabled={
                loading
              }
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;