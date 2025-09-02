module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    
    // Join a quiz room
    socket.on('JOIN_ROOM', (roomCode) => {
      socket.join(roomCode);
      console.log(`Socket ${socket.id} joined room ${roomCode}`);
    });
    
    // Submit an answer
    socket.on('SUBMIT_ANSWER', (data) => {
      const { roomCode, questionId, answer } = data;
      console.log(`Answer submitted in room ${roomCode} for question ${questionId}`);
      
      // Broadcast to everyone in the room except the sender
      socket.to(roomCode).emit('NEW_ANSWER', {
        userId: socket.id,
        questionId,
        answer
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};