import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinQuiz } from '../../services/api';

export default function JoinQuiz() {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    
    if (!roomCode || !name) {
      setError('Please enter both your name and room code');
      return;
    }
    
    try {
      const response = await joinQuiz(roomCode);
      localStorage.setItem('studentInfo', JSON.stringify({
        name,
        quizId: response.data._id,
        roomCode
      }));
      navigate(`/student/quiz/${response.data._id}`);
    } catch (err) {
      setError('Failed to join quiz. Please check the room code.');
    }
  };

  return (
    <div className="join-quiz">
      <h2>Join a Quiz</h2>
      
      <form onSubmit={handleJoin}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        
        <div className="form-group">
          <label>Room Code</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            placeholder="Enter room code"
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit">Join Quiz</button>
      </form>
    </div>
  );
}