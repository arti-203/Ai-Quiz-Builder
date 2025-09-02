import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../../services/api';
import '../../styles/Dashboard.css';

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch quizzes:', err);
        setLoading(false);
      }
    };
    
    fetchQuizzes();
  }, []);

  return (
    <div className="dashboard create-quiz-page">
      <div className="dashboard-header">
        <h2>Your Quizzes</h2>
        <Link to="/create" className="btn-new">Create New Quiz</Link>
      </div>
      
      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <div className="no-quizzes">
          <p>You haven't created any quizzes yet</p>
          <Link to="/create">Create your first quiz</Link>
        </div>
      ) : (
        <div className="quiz-list">
          {quizzes.map(quiz => (
            <div key={quiz._id} className="quiz-card">
              <h3>{quiz.title}</h3>
              <p>Room Code: {quiz.roomCode}</p>
              <p>Questions: {quiz.questions.length}</p>
              <p>Status: {quiz.isLive ? (
                <span className="live-status">Live Now</span>
              ) : (
                <span>Draft</span>
              )}</p>
              <div className="quiz-actions">
                <Link to={`/live/${quiz._id}`} className="btn-action">
                  {quiz.isLive ? 'View Live' : 'Start Quiz'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}