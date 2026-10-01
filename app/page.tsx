"use client";

import { FormEvent, useState } from "react";

const languages = ["English", "தமிழ்", "हिन्दी", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "বাংলা"];

export default function Home() {
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (!message.trim() || loading) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language }),
      });
      const data = await res.json();
      setReply(data.reply || "Sorry, I could not answer that.");
    } catch {
      setReply("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", padding: "32px 18px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌸</div>
          <h1 style={{ fontSize: "clamp(38px, 7vw, 64px)", margin: 0, fontWeight: 800 }}>
            MRthi AI
          </h1>
          <p style={{ fontSize: 19, color: "#6d6677", marginTop: 10 }}>
            Your AI guide, in your language.
          </p>
          <p style={{ color: "#6d6677" }}>
            Ask about the Tamil Nadu NEEDS scheme in the language you prefer.
          </p>
        </header>

        <section style={{
          background: "white", borderRadius: 28, padding: 24,
          boxShadow: "0 18px 60px rgba(113,15,229,.10)",
          border: "1px solid #eee7f7"
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
            {languages.map((item) => (
              <button
                key={item}
                onClick={() => setLanguage(item)}
                style={{
                  border: 0, borderRadius: 999, padding: "9px 14px", cursor: "pointer",
                  background: language === item ? "#710fe5" : "#f1ecf8",
                  color: language === item ? "white" : "#40394b"
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div style={{
            minHeight: 180, padding: 20, borderRadius: 20,
            background: "#f8f5fc", marginBottom: 16
          }}>
            {reply ? (
              <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0 }}>{reply}</p>
            ) : (
              <p style={{ color: "#81798b", margin: 0 }}>
                Ask a question about eligibility, application steps, documents, or the NEEDS scheme.
              </p>
            )}
          </div>

          <form onSubmit={sendMessage} style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              rows={4}
              style={{
                width: "100%", resize: "vertical", border: "1px solid #ddd4e8",
                borderRadius: 16, padding: 15, outline: "none"
              }}
            />
            <button
              disabled={loading}
              type="submit"
              style={{
                border: 0, borderRadius: 16, padding: "14px 20px",
                background: "#710fe5", color: "white", fontWeight: 700,
                cursor: loading ? "wait" : "pointer"
              }}
            >
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>
        </section>

        <footer style={{ textAlign: "center", color: "#81798b", marginTop: 22, fontSize: 13 }}>
          MRthi AI • Built with Next.js and Gemini
        </footer>
      </div>
    </main>
  );
}
