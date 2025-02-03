import React, { useState, useEffect } from "react";
import "./App.css";

const BASE_COLORS = {
  red: ["#ff0000", "#cc0000", "#aa0000", "#990000", "#880000", "#770000"],
  blue: ["#0000ff", "#0000cc", "#0000aa", "#000099", "#000088", "#000077"],
  green: ["#00ff00", "#00cc00", "#00aa00", "#009900", "#008800", "#007700"],
  yellow: ["#ffff00", "#cccc00", "#aaaa00", "#999900", "#888800", "#777700"],
  purple: ["#800080", "#660066", "#550055", "#440044", "#330033", "#220022"],
  orange: ["#ffa500", "#cc8400", "#aa7300", "#996200", "#885100", "#774000"],
};

export default function App() {
  const [targetColor, setTargetColor] = useState("");
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startNewGame(true);
  }, []);

  const startNewGame = (resetScore = false) => {
    const colorKeys = Object.keys(BASE_COLORS);
    const baseColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    const shades = BASE_COLORS[baseColor];
    const target = shades[Math.floor(Math.random() * shades.length)];

    setTargetColor(target);
    setColorOptions(shades.sort(() => Math.random() - 0.5));
    setStatus("");
    if (resetScore) setScore(0);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setStatus("Correct! 🎉");
    } else {
      setStatus("Wrong! Try again. ❌");
    }
    setTimeout(() => startNewGame(false), 1000);
  };

  return (
    <div className="game-container">
      <h1 data-testid="gameInstructions">Guess the correct shade!</h1>
      <div
        data-testid="colorBox"
        className="color-box"
        style={{ backgroundColor: targetColor }}
      ></div>
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color-button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>
      <p data-testid="gameStatus" className="game-status">
        {status}
      </p>
      <p data-testid="score" className="score">
        Score: {score}
      </p>
      <button
        data-testid="newGameButton"
        className="new-game-button"
        onClick={() => startNewGame(true)}
      >
        New Game
      </button>
    </div>
  );
}
