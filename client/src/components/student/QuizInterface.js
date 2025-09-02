// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSocket } from '../../contexts/SocketContext';
// import { getQuiz, submitAnswer } from '../../services/api';
// import Countdown from '../common/Countdown';

// export default function QuizInterface() {
//   const { id } = useParams();
//   const socket = useSocket();
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);
//   let optionClass = "option clickable";
 
//   const [studentInfo] = useState(() => {
//     const saved = localStorage.getItem('studentInfo');
//     return saved ? JSON.parse(saved) : null;
//   });

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await getQuiz(id);
//         setQuiz(response.data);

//         if (response.data.isLive && response.data.currentQuestion !== undefined) {
//           setCurrentQuestion(response.data.questions[response.data.currentQuestion]);
//         }
//       } catch (err) {
//         console.error('Failed to fetch quiz:', err);
//       }
//     };

//     fetchQuiz();
//   }, [id]);

//   useEffect(() => {
//     if (!socket || !studentInfo) return;

//     socket.emit('JOIN_ROOM', studentInfo.roomCode);

//     const handleNewQuestion = (data) => {
//       setQuiz(prevQuiz => {
//         if (prevQuiz && prevQuiz.questions) {
//           setCurrentQuestion(prevQuiz.questions[data.questionIndex]);
//         }
//         return prevQuiz;
//       });

//       setSelectedAnswer(null);
//       setIsSubmitted(false);
//       setTimeLeft(30);
//     };

//     const handleQuestionClosed = () => {
//       setIsSubmitted(true);
//     };

//     const handleQuizEnded = () => {
//       window.location = `/student/results/${id}`;
//     };

//     socket.on('NEW_QUESTION', handleNewQuestion);
//     socket.on('QUESTION_CLOSED', handleQuestionClosed);
//     socket.on('QUIZ_ENDED', handleQuizEnded);

//     return () => {
//       socket.off('NEW_QUESTION', handleNewQuestion);
//       socket.off('QUESTION_CLOSED', handleQuestionClosed);
//       socket.off('QUIZ_ENDED', handleQuizEnded);
//     };
//   }, [id, socket, studentInfo]);

//   const handleAnswerSelect = (index) => {
//     if (!isSubmitted) {
//       setSelectedAnswer(index);
//     }
//   };

//   const handleSubmit = async () => {
//     if (selectedAnswer === null || !currentQuestion) return;

//     try {
//       await submitAnswer({
//         quizId: id,
//         questionId: currentQuestion._id,
//         studentName: studentInfo.name,
//         answer: selectedAnswer
//       });
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error('Failed to submit answer:', err);
//     }
//   };

//   const handleEndQuiz = () => {
//     window.location = `/student/results/${id}`;
//   };

//   if (!quiz || !currentQuestion) return <div>Loading quiz...</div>;

//   return (
//     <div className="quiz-interface">
//       <div className="quiz-header">
//         <h2>{quiz.title}</h2>
//         <p>Student: {studentInfo.name}</p>
//       </div>

//       <div className="question-meta">
//         <Countdown timeLeft={timeLeft} />
//       </div>

//       {/* Question with clickable options */}
//       <div className="question">
//         <h3>{currentQuestion.text}</h3>
//         <ul>
//           {currentQuestion.options.map((option, index) => (
//             <li
//               key={index}
//               onClick={() => handleAnswerSelect(index)}
//               className={`option 
//                 ${selectedAnswer === index ? 'selected' : ''} 
//                 ${isSubmitted ? (index === currentQuestion.correctAnswer ? 'correct' : '') : ''}
//               `}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Submit or feedback */}
//       {!isSubmitted ? (
//         <button
//           onClick={handleSubmit}
//           disabled={selectedAnswer === null}
//           className="submit-btn"
//         >
//           Submit Answer
//         </button>
//       ) : (
//         <div className="answer-feedback">
//           {selectedAnswer === currentQuestion.correctAnswer ? (
//             <p className="correct">✓ Correct!</p>
//           ) : (
//             <p className="incorrect">✗ Incorrect</p>
//           )}
//           <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
//         </div>
//       )}

//       {/* End Quiz button */}
//       <button onClick={handleEndQuiz} className="end-quiz-btn">
//         End Quiz
//       </button>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSocket } from '../../contexts/SocketContext';
// import { getQuiz, submitAnswer } from '../../services/api';
// import Countdown from '../common/Countdown';

// export default function QuizInterface() {
//   const { id } = useParams();
//   const socket = useSocket();
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(30);

//   const [studentInfo] = useState(() => {
//     const saved = localStorage.getItem('studentInfo');
//     return saved ? JSON.parse(saved) : null;
//   });

//   // Fetch quiz initially
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await getQuiz(id);
//         setQuiz(response.data);

//         if (response.data.isLive && response.data.currentQuestion !== undefined) {
//           setCurrentQuestion(response.data.questions[response.data.currentQuestion]);
//         }
//       } catch (err) {
//         console.error('Failed to fetch quiz:', err);
//       }
//     };

//     fetchQuiz();
//   }, [id]);

//   // Join socket room and listen for server events
//   useEffect(() => {
//     if (!socket || !studentInfo) return;

//     socket.emit('JOIN_ROOM', studentInfo.roomCode);

//     const handleNewQuestion = (data) => {
//       setQuiz(prevQuiz => {
//         if (prevQuiz && prevQuiz.questions) {
//           setCurrentQuestion(prevQuiz.questions[data.questionIndex]);
//         }
//         return prevQuiz;
//       });

//       setSelectedAnswer(null);
//       setIsSubmitted(false);
//       setTimeLeft(30);
//     };

//     const handleQuestionClosed = () => {
//       setIsSubmitted(true);
//     };

//     const handleQuizEnded = () => {
//       window.location = `/student/results/${id}`;
//     };

//     socket.on('NEW_QUESTION', handleNewQuestion);
//     socket.on('QUESTION_CLOSED', handleQuestionClosed);
//     socket.on('QUIZ_ENDED', handleQuizEnded);

//     return () => {
//       socket.off('NEW_QUESTION', handleNewQuestion);
//       socket.off('QUESTION_CLOSED', handleQuestionClosed);
//       socket.off('QUIZ_ENDED', handleQuizEnded);
//     };
//   }, [id, socket, studentInfo]);

//   // Countdown timer effect
//   useEffect(() => {
//     if (!currentQuestion || !quiz) return;

//     if (timeLeft <= 0) {
//       handleSubmit();

//       // move to next question
//       const currentIndex = quiz.questions.findIndex(q => q._id === currentQuestion._id);
//       const nextIndex = currentIndex + 1;

//       if (nextIndex < quiz.questions.length) {
//         setCurrentQuestion(quiz.questions[nextIndex]);
//         setSelectedAnswer(null);
//         setIsSubmitted(false);
//         setTimeLeft(30);
//       } else {
//         handleEndQuiz();
//       }
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, quiz, currentQuestion]);

//   const handleAnswerSelect = (index) => {
//     if (!isSubmitted) {
//       setSelectedAnswer(index);
//     }
//   };

//   const handleSubmit = async () => {
//     if (selectedAnswer === null || !currentQuestion) return;

//     try {
//       await submitAnswer({
//         quizId: id,
//         questionId: currentQuestion._id,
//         studentName: studentInfo.name,
//         answer: selectedAnswer
//       });
//       setIsSubmitted(true);
//     } catch (err) {
//       console.error('Failed to submit answer:', err);
//     }
//   };

//   const handleEndQuiz = () => {
//     window.location = `/student/results/${id}`;
//   };

//   if (!quiz || !currentQuestion) return <div>Loading quiz...</div>;

//   return (
//     <div className="quiz-interface">
//       <div className="quiz-header">
//         <h2>{quiz.title}</h2>
//         <p>Student: {studentInfo.name}</p>
//       </div>

//       <div className="question-meta">
//         <Countdown timeLeft={timeLeft} />
//       </div>

//       {/* Question with clickable options */}
//       <div className="question">
//         <h3>{currentQuestion.text}</h3>
//         <ul>
//           {currentQuestion.options.map((option, index) => (
//             <li
//               key={index}
//               onClick={() => handleAnswerSelect(index)}
//               className={`option 
//                 ${selectedAnswer === index ? 'selected' : ''} 
//                 ${isSubmitted ? (index === currentQuestion.correctAnswer ? 'correct' : '') : ''}
//               `}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Submit or feedback */}
//       {!isSubmitted ? (
//         <button
//           onClick={handleSubmit}
//           disabled={selectedAnswer === null}
//           className="submit-btn"
//         >
//           Submit Answer
//         </button>
//       ) : (
//         <div className="answer-feedback">
//           {selectedAnswer === currentQuestion.correctAnswer ? (
//             <p className="correct">✓ Correct!</p>
//           ) : (
//             <p className="incorrect">✗ Incorrect</p>
//           )}
//           <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
//         </div>
//       )}

//       {/* End Quiz button */}
//       <button onClick={handleEndQuiz} className="end-quiz-btn">
//         End Quiz
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../contexts/SocketContext";
import { getQuiz } from "../../services/api";
import Question from "../common/Question";
import Countdown from "../common/Countdown";

export default function QuizInterface() {
  const { id } = useParams();
  const socket = useSocket();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionClosed, setQuestionClosed] = useState(false); // ✅ teacher closed question
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // ✅ Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz(id);
        setQuiz(response.data);

        if (socket) {
          socket.emit("JOIN_ROOM", response.data.roomCode);
        }
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
      }
    };

    fetchQuiz();
  }, [id, socket]);

  // ✅ Listen for teacher events
  useEffect(() => {
    if (!socket) return;

    socket.on("NEW_QUESTION", ({ questionIndex }) => {
      setCurrentQuestion(questionIndex);
      setQuestionClosed(false);
      setTimeLeft(30);
      setSelectedAnswer(null);
    });

    socket.on("QUESTION_CLOSED", () => {
      setQuestionClosed(true);
    });

    socket.on("QUIZ_ENDED", () => {
      alert("Quiz has ended!"); // later replace with Results page
    });

    return () => {
      socket.off("NEW_QUESTION");
      socket.off("QUESTION_CLOSED");
      socket.off("QUIZ_ENDED");
    };
  }, [socket]);

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="student-quiz">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <p>Room Code: <strong>{quiz.roomCode}</strong></p>
      </div>

      <div className="question-control">
        <div className="question-meta">
          <span>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <Countdown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        </div>

        {/* ✅ Only show correct answer after teacher ends question */}
        <Question
          question={quiz.questions[currentQuestion]}
          questionIndex={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={setSelectedAnswer}
          showAnswer={questionClosed}
        />
      </div>
    </div>
  );
}

