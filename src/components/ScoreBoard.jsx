import React from "react";
import logo from "../assets/logo.png";

/* ----------------------- scoreboard header component ---------------------- */
const ScoreBoard = ({ currentScore, highScore }) => {
  return (
    <header>
      <div className="logo__section">
        <img src={logo} width="100px" alt="pokemon logo" />
        <h1>
          Memory <span className="blue">Card</span> <br />{" "}
          <span className="yellow">Game!</span>
        </h1>
      </div>
      <div className="scores">
        <div className="currentScore">
          <h3>Current Score: {currentScore}</h3>
        </div>
        <div className="highScore">
          <h3>Highest Score: {highScore}</h3>
        </div>
      </div>
    </header>
  );
};

export default ScoreBoard;
