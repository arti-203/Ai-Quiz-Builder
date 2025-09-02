import React, { useEffect } from 'react';

export default function Countdown({ timeLeft, setTimeLeft, onEnd }) {
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onEnd) onEnd();
      return;
    }
    
    const timer = setTimeout(() => {
      if (setTimeLeft) setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, setTimeLeft, onEnd]);

  // Calculate color based on time left
  const getColor = () => {
    if (timeLeft > 15) return 'green';
    if (timeLeft > 5) return 'orange';
    return 'red';
  };

  return (
    <div className="countdown-timer" style={{ color: getColor() }}>
      {timeLeft}s
    </div>
  );
}