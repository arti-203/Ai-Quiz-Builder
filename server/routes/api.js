// const express = require('express');
// const router = express.Router();
// const quizController = require('../controllers/quizController');
// const aiController = require('../controllers/aiController');

// // ✅ Quiz routes (cleaned path – no repeated /quiz)
// router.post('/quiz/create', quizController.createQuiz);
// router.get('/quiz/:id', quizController.getQuiz);
// router.patch('/quiz/start/:id', quizController.startQuiz);
// router.post('/quiz/join', quizController.joinQuiz);
// router.post('/quiz/submit', quizController.submitAnswer);
// router.get('/quiz/results/:id', quizController.getResults);

// // ✅ AI routes (optional for generating via separate endpoint)
// router.post('/ai/generate-questions', aiController.generateQuestions);

// module.exports = router;
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const aiController = require('../controllers/aiController');

// ✅ Matches: /api/quiz/create
router.post('/create', quizController.createQuiz);

// Other quiz routes
router.get('/:id', quizController.getQuiz);
router.patch('/start/:id', quizController.startQuiz);
router.post('/join', quizController.joinQuiz);
router.post('/submit', quizController.submitAnswer);
router.get('/results/:id', quizController.getResults);

// Optional AI route
router.post('/ai/generate-questions', aiController.generateQuestions);

module.exports = router;

