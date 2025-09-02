export function setupSocketListeners(socket, handlers) {
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
  
  socket.on('QUIZ_STARTED', handlers.onQuizStarted);
  socket.on('NEW_QUESTION', handlers.onNewQuestion);
  socket.on('QUESTION_CLOSED', handlers.onQuestionClosed);
  socket.on('LIVE_RESULTS', handlers.onLiveResults);
  socket.on('QUIZ_ENDED', handlers.onQuizEnded);
  
  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
  
  return () => {
    socket.off('QUIZ_STARTED');
    socket.off('NEW_QUESTION');
    socket.off('QUESTION_CLOSED');
    socket.off('LIVE_RESULTS');
    socket.off('QUIZ_ENDED');
  };
}