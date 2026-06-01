const fetch = require('node-fetch');

exports.generateQuizQuestions = async (topic, questionCount) => {
  try {
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      throw new Error('Missing OPENROUTER_API_KEY');
    }

    console.log('Calling OpenRouter API...');

    const prompt = `
Generate exactly ${questionCount} multiple-choice questions on the topic "${topic}".

Each question MUST follow this JSON format:

{
  "text": "...",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0,
  "explanation": "..."
}

Rules:
- Always return valid JSON only.
- No markdown.
- No extra text.
- Exactly 4 options.
- "correctAnswer" must be a number between 0-3.
- All questions must be different.
`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You generate structured quiz questions.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('AI Error:', data);
      throw new Error('AI request failed');
    }

    let raw = data.choices[0].message.content.trim();
    raw = raw.replace(/```json|```/g, '').trim();

    let questions;

    try {
      questions = JSON.parse(raw);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      throw new Error('Failed to parse AI JSON');
    }

    const valid = Array.isArray(questions) && questions.every((question) =>
      question.text &&
      question.options &&
      question.options.length === 4 &&
      typeof question.correctAnswer === 'number' &&
      question.correctAnswer >= 0 &&
      question.correctAnswer <= 3 &&
      question.explanation
    );

    if (!valid) {
      throw new Error('Invalid question format from AI.');
    }

    return questions;
  } catch (error) {
    console.error('AI Generation Failed:', error);
    throw error;
  }
};
