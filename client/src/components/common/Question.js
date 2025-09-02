
// import React from 'react';

// export default function Question({
//   question,
//   onAnswerSelect,
//   selectedAnswer,
//   isSubmitted
// }) {
//   if (!question) return null;

//   // Clickable only if the parent passed a function and the question isn't submitted/locked
//   const isClickable = typeof onAnswerSelect === 'function' && !isSubmitted;

//   return (
//     <div className="question-container">
//       <h3 className="question-text">{question.text}</h3>

//       <div className="options-grid">
//         {question.options.map((option, index) => {
//           const isSelected = selectedAnswer === index;

//           const classes = [
//             'option',
//             isSelected ? 'selected' : '',
//             isSubmitted && index === question.correctAnswer ? 'correct' : '',
//             isSubmitted && isSelected && index !== question.correctAnswer ? 'incorrect' : '',
//             isClickable ? 'clickable' : '' // just to tweak cursor style if you want
//           ]
//             .join(' ')
//             .trim();

//           return (
//             <div
//               key={index}
//               className={classes}
//               onClick={
//                 isClickable
//                   ? () => {
//                       onAnswerSelect(index);
//                     }
//                   : undefined
//               }
//             >
//               <div className="option-letter">{String.fromCharCode(65 + index)}</div>
//               <div className="option-text">{option}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function Question({ question, questionIndex, showAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="question">
      <h3>
        Q{questionIndex + 1}: {question.text}
      </h3>
      <ul className="options">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <li
              key={index}
              className={`option ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelect(index)}
            >
              {option}
            </li>
          );
        })}
      </ul>

      {showAnswer && selectedOption !== null && (
        <div className="answer">
          <strong>Correct Answer:</strong>{" "}
          {question.options[question.correctAnswer]}
        </div>
      )}

      <style jsx>{`
        .options {
          list-style: none;
          padding: 0;
        }
        .option {
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .option:hover {
          background: #e0f0ff; /* Light blue hover */
        }
        .option.selected {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }
      `}</style>
    </div>
  );
}
