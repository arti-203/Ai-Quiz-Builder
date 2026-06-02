
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../../contexts/SocketContext';
import { getQuiz, startQuiz } from '../../services/api';
import Question from '../common/Question';
import Results from '../common/Results';
import Countdown from '../common/Countdown';

export default function LiveQuiz() {
  const { id } = useParams();
  const socket = useSocket();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuiz(id);
        setQuiz(response.data);
        setIsLive(response.data.isLive);

        if (socket) {
          socket.emit('JOIN_ROOM', response.data.roomCode);
        }
      } catch (err) {
        console.error('Failed to fetch quiz:', err);
      }
    };

    fetchQuiz();
  }, [id, socket]);

  // Start quiz
  const startQuizHandler = async () => {
    try {
      await startQuiz(id);
      setIsLive(true);
      socket.emit('QUIZ_STARTED', { roomCode: quiz.roomCode });
    } catch (err) {
      console.error('Failed to start quiz:', err);
    }
  };

  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30); // reset timer
      socket.emit('NEW_QUESTION', {
        roomCode: quiz.roomCode,
        questionIndex: currentQuestion + 1
      });
    } else {
      endQuiz();
    }
  };

  // End current question
  const endQuestion = () => {
    socket.emit('QUESTION_CLOSED', {
      roomCode: quiz.roomCode,
      questionIndex: currentQuestion
    });
  };

  // End entire quiz
  const endQuiz = () => {
    setShowResults(true);
    socket.emit('QUIZ_ENDED', { roomCode: quiz.roomCode });
  };

  // ⏳ Automatically move to next question when timer ends
  useEffect(() => {
    if (timeLeft === 0) {
      endQuestion();
      setTimeout(() => {
        nextQuestion();
      }, 1000); // small delay before moving to next
    }
  }, [timeLeft]);

//   useEffect(() => {
//   if (timeLeft === 0) {
//     endQuestion();
//     setTimeout(() => {
//       nextQuestion();
//     }, 1000);
//   }
// }, [timeLeft, endQuestion, nextQuestion]);

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div className="live-quiz">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <p>
          Room Code: <strong>{quiz.roomCode}</strong>
        </p>
      </div>

      {!isLive ? (
        <div className="quiz-lobby">
          <h3>Waiting to Start</h3>
          <p>
            Share this room code with students: <strong>{quiz.roomCode}</strong>
          </p>
          <button onClick={startQuizHandler}>Start Quiz</button>
        </div>
      ) : showResults ? (
        <Results quizId={quiz._id} isTeacher={true} />
      ) : (
        <div className="question-control">
          <div className="question-meta">
            <span>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <Countdown
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onEnd={() => {
                endQuestion();
                nextQuestion(); // ✅ Auto move on countdown end
              }}
            />
          </div>

          <Question
            question={quiz.questions[currentQuestion]}
            questionIndex={currentQuestion}
            showAnswer={false}
          />

          <div className="quiz-controls">
            <button onClick={endQuestion}>End Question</button>
            <button onClick={nextQuestion}>
              {currentQuestion < quiz.questions.length - 1
                ? 'Next Question'
                : 'End Quiz'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

