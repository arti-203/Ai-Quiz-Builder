const { generateQuizQuestions } = require('../services/openaiService');

// Controller specifically for AI operations
exports.generateQuestions = async (req, res) => {
  try {
    const { topic, questionCount } = req.body;
    const questions = await generateQuizQuestions(topic, parseInt(questionCount));
    res.json(questions);
  } catch (error) {
    console.error('AI Question Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
};