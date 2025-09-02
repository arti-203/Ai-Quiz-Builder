const Quiz = require('../models/Quiz');
const { generateQuizQuestions } = require('../services/openaiService');

// Create a new quiz with AI-generated questions
exports.createQuiz = async (req, res) => {
  try {
    const { title, topic, questionCount } = req.body;
    
    // Generate questions using OpenAI
    const questions = await generateQuizQuestions(topic, parseInt(questionCount));
    
    // Create quiz document
    const newQuiz = new Quiz({
      title,
      topic,
      roomCode: generateRoomCode(),
      questions,
      //createdBy: req.user ? req.user.id : 'system' // Add authentication later
    });
    
    await newQuiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('Quiz Creation Error:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

// Get a quiz by ID
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Start a quiz (set it live)
exports.startQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    quiz.isLive = true;
    await quiz.save();
    
    // Notify all connected clients
    req.io.to(quiz.roomCode).emit('QUIZ_STARTED', quiz);
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Join a quiz by room code
exports.joinQuiz = async (req, res) => {
  try {
    const { roomCode } = req.body;
    const quiz = await Quiz.findOne({ roomCode, isLive: true });
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found or not live' });
    }
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Submit an answer to a quiz question
exports.submitAnswer = async (req, res) => {
  try {
    const { quizId, questionId, studentName, answer } = req.body;
    
    // In a real app, you'd store this in a separate collection
    // For this example, we'll just broadcast it via socket
    
    const quiz = await Quiz.findById(quizId);
    if (!quiz || !quiz.isLive) {
      return res.status(400).json({ error: 'Quiz not active' });
    }
    
    // Broadcast answer to room
    req.io.to(quiz.roomCode).emit('NEW_ANSWER', {
      questionId,
      studentName,
      answer,
      timestamp: new Date()
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get quiz results
exports.getResults = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    // In a real app, you'd calculate actual results from a submissions collection
    // For demo purposes, return mock results
    const results = generateMockResults(quiz);
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to generate room code
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// Mock results generator (replace with real implementation)
function generateMockResults(quiz) {
  const students = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'];
  const leaderboard = students.map((name, i) => ({
    name,
    score: Math.floor(Math.random() * 80) + 20,
    rank: i + 1
  })).sort((a, b) => b.score - a.score);
  
  const questions = quiz.questions.map((q, idx) => ({
    id: q._id,
    text: q.text,
    correctAnswer: q.correctAnswer,
    answerDistribution: Array(4).fill(0).map(() => Math.floor(Math.random() * 30) + 10)
  }));
  
  return {
    quizId: quiz._id,
    title: quiz.title,
    totalQuestions: quiz.questions.length,
    participants: students.length,
    averageScore: Math.floor(leaderboard.reduce((sum, s) => sum + s.score, 0) / students.length),
    leaderboard,
    questions
  };
}

