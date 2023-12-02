import React from 'react'
import "./Quiz.css";

const QuizResult = (props) => {
  return (
    <div>
        <div className='show-score'>
        Your Score:{props.score}<br/>
        Total Score:{props.totalScore}
    </div>
    <button id="try-button" onClick={props.tryAgain}>Try Again</button>
    </div>
  )
}

export default QuizResult