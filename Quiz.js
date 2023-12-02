import React, { useEffect, useState } from "react";
import { QuizData } from "./QuizData";
import QuizResult from "./QuizResult";
import "./Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timer, setTimer] = useState(15); 

  const changeQuestion = (direction) => {
    updateScore();
    resetTimer();   
    if (direction === "next") {
      if (currentQuestion < QuizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setClickedOption(0);
        setFeedback("");
      } else if (direction === "prev" && currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setClickedOption(0);
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }
  };
  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }
  };
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setFeedback("");
    resetTimer();
  };

  const resetTimer = () => {
    setTimer(15); 
  };

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1500);
    } else {
      clearInterval(countdown);
      changeQuestion('next');
    }
    return () => clearInterval(countdown); 
  }, [timer, changeQuestion]);

  return (
    <div>
      <p className="heading-txt">Quiz APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={QuizData.length}
            tryAgain={resetAll}
          />
        ) : (
          <div>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">
                {QuizData[currentQuestion].question}
              </span>
            </div>
            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    // className="option-btn"
                    className={`option-btn ${
                      clickedOption === i + 1 ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="feedback">{feedback}</div>
            <div className="timer">Time remaining: {timer} seconds</div>
            <div className="navigation-buttons">
              <button
                id="prev-button"
                onClick={() => changeQuestion("prev")}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button id="next-button" onClick={() => changeQuestion("next")}>
                {currentQuestion < QuizData.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
