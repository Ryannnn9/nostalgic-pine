import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const crosswordData = [
  {
    clue: "1. The most famous park with the Old Faithful geyser (18 letters)",
    answer: "yellowstonenational",
    hint: "Think geysers and bison",
    id: 1,
  },
  {
    clue: "2. Park known for Half Dome and giant sequoias (20 letters)",
    answer: "yosemitenationalpark",
    hint: "Famous for Half Dome",
    id: 2,
  },
  {
    clue: "3. Park in Arizona with a famous canyon (17 letters)",
    answer: "grandcanyonnational",
    hint: "Huge canyon carved by the Colorado River",
    id: 3,
  },
  {
    clue: "4. Park in Utah with unique red rock formations (12 letters)",
    answer: "brycecanyon",
    hint: "Named after a Mormon settler",
    id: 4,
  },
  {
    clue: "5. Florida park with swamps and alligators (24 letters)",
    answer: "evergladesnationalpark",
    hint: "Home to mangroves and panthers",
    id: 5,
  },
];

export default function CrosswordGame() {
  const [answers, setAnswers] = useState({});
  const [correct, setCorrect] = useState([]);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [hintsShown, setHintsShown] = useState([]);

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value.toLowerCase() });
    setChecked(false);
  };

  const checkAnswers = () => {
    const correctIds = crosswordData
      .filter((q) => answers[q.id]?.trim() === q.answer)
      .map((q) => q.id);
    setCorrect(correctIds);
    setChecked(true);
    setAttempts((prev) => prev + 1);

    // Show hints after 3 wrong attempts
    if (attempts + 1 >= 3) {
      const hintsToShow = crosswordData
        .filter((q) => !correct.includes(q.id))
        .map((q) => q.id);
      setHintsShown(hintsToShow);
    }
  };

  const resetGame = () => {
    setAnswers({});
    setCorrect([]);
    setChecked(false);
    setAttempts(0);
    setHintsShown([]);
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        🧠 U.S. National Parks Crossword
      </h1>
      <p style={{ textAlign: "center", marginBottom: "2rem", color: "#555" }}>
        Type the correct name of each national park based on the clue.
      </p>

      {crosswordData.map(({ clue, id, answer, hint }) => (
        <div
          key={id}
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "1rem",
            padding: "1rem",
            background: "#f9f9f9",
          }}
        >
          <p style={{ fontSize: "1rem", marginBottom: ".5rem", color: "#333" }}>
            {clue}
          </p>
          <input
            type="text"
            placeholder={`${answer.length} letters`}
            value={answers[id] || ""}
            onChange={(e) => handleChange(id, e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: correct.includes(id)
                ? "2px solid green"
                : checked && answers[id]
                ? "2px solid red"
                : "1px solid #ccc",
              backgroundColor: correct.includes(id)
                ? "#e0ffe0"
                : checked && answers[id]
                ? "#ffe0e0"
                : "white",
              fontSize: "1rem",
            }}
            disabled={correct.includes(id)}
          />
          {hintsShown.includes(id) && !correct.includes(id) && (
            <p
              style={{
                marginTop: "0.5rem",
                color: "#888",
                fontStyle: "italic",
              }}
            >
              Hint: {hint}
            </p>
          )}
        </div>
      ))}

      <motion.div whileHover={{ scale: 1.05 }}>
        <button
          onClick={checkAnswers}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            borderRadius: "0.75rem",
            border: "none",
            background: "linear-gradient(to right, #000, #444)",
            color: "white",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        >
          Check Answers
        </button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }}>
        <button
          onClick={resetGame}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            fontWeight: "500",
            borderRadius: "0.75rem",
            border: "1px solid #ccc",
            background: "white",
            color: "#333",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </motion.div>

      {checked && correct.length === crosswordData.length && (
        <motion.div
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "green",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 Congratulations! You completed the crossword correctly!
        </motion.div>
      )}
    </div>
  );
}
