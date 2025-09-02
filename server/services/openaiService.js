// const { Configuration, OpenAIApi } = require('openai');
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Generate quiz questions using OpenAI
// exports.generateQuizQuestions = async (topic, count = 5) => {
//   try {
//     const prompt = `Generate ${count} multiple-choice quiz questions about ${topic}. 
//     Format each question as JSON object with:
//     - "text": the question
//     - "options": array of 4 strings (choices)
//     - "correctAnswer": number (0-3) indicating correct option
//     - "explanation": brief explanation
    
//     Return a JSON array of these objects. Example:
//     [
//       {
//         "text": "What is the capital of France?",
//         "options": ["London", "Berlin", "Paris", "Madrid"],
//         "correctAnswer": 2,
//         "explanation": "Paris is the capital of France."
//       }
//     ]`;

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { 
//           role: "system", 
//           content: "You are an expert quiz generator. Return only valid JSON." 
//         },
//         { 
//           role: "user", 
//           content: prompt 
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 2000
//     });

//     const content = response.data.choices[0].message.content;
//     const questions = JSON.parse(content);
    
//     // Validate the structure
//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error('Invalid question format from AI');
//     }
    
//     return questions;
//   } catch (error) {
//     console.error('OpenAI API Error:', error);
//     throw new Error('Failed to generate questions with AI');
//   }
// };

// server/services/openaiService.js
// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// exports.generateQuizQuestions = async (topic, count = 5) => {
//   try {
//     const prompt = `Generate ${count} multiple-choice quiz questions about ${topic}. 
//     Format each question as a JSON object with:
//     - "text": the question
//     - "options": array of 4 strings (choices)
//     - "correctAnswer": number (0-3) indicating correct option
//     - "explanation": brief explanation
    
//     Return a JSON array of these objects.`;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert quiz generator. Return only valid JSON."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 2000
//     });

//     const content = response.choices[0].message.content;
//     const questions = JSON.parse(content);

//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error('Invalid question format from AI');
//     }

//     return questions;
//   } catch (error) {
//     console.error('OpenAI API Error:', error.message);
//     throw new Error('Failed to generate questions with AI');
//   }
// };


// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /**
//  * Generate quiz questions from OpenAI
//  */
// exports.generateQuizQuestions = async (topic, count = 5) => {
//   try {
//     const prompt = `Generate ${count} multiple-choice quiz questions about "${topic}". 
// Format each question as a JSON object with:
// - "text": the question
// - "options": array of 4 strings (choices)
// - "correctAnswer": number (0-3) indicating the correct option
// - "explanation": a brief explanation
    
// Return a valid JSON array of these objects ONLY, without extra text or comments.`;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert quiz generator. Return only valid JSON in array format."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 2000
//     });

//     const rawContent = response.choices[0]?.message?.content;

//     if (!rawContent) {
//       throw new Error("Empty response from OpenAI.");
//     }

//     // Attempt to extract only JSON content
//     const jsonStart = rawContent.indexOf('[');
//     const jsonEnd = rawContent.lastIndexOf(']');
//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("Response does not contain a valid JSON array.");
//     }

//     const jsonString = rawContent.substring(jsonStart, jsonEnd + 1);
//     const questions = JSON.parse(jsonString);

//     // Basic validation
//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("Invalid format: expected non-empty array");
//     }

//     questions.forEach((q, i) => {
//       if (
//         typeof q.text !== 'string' ||
//         !Array.isArray(q.options) ||
//         typeof q.correctAnswer !== 'number'
//       ) {
//         throw new Error(`Question ${i + 1} has invalid structure`);
//       }
//     });

//     return questions;
//   } catch (error) {
//     console.error("OpenAI API Error:", error.message);
//     throw new Error("Failed to generate questions with AI");
//   }
// };




// const OpenAI = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   baseURL: "https://openrouter.ai/api/v1", // ✅ REQUIRED
// });

// /**
//  * Generate quiz questions using OpenAI
//  */
// exports.generateQuizQuestions = async (topic, count = 5) => {
//   try {
//     const prompt = `Generate ${count} multiple-choice quiz questions about "${topic}". 
// Format each question as a JSON object with:
// - "text": the question
// - "options": array of 4 strings (choices)
// - "correctAnswer": number (0-3) indicating the correct option
// - "explanation": a brief explanation

// Return a valid JSON array of these objects ONLY, without extra text or comments.`;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//      // model: "openrouter/openai/gpt-3.5-turbo", // ✅ FIXED
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert quiz generator. Return only valid JSON in array format."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 2000,
//     });

//     const rawContent = response.choices?.[0]?.message?.content;

//     if (!rawContent) {
//       throw new Error("Empty response from OpenAI.");
//     }

//     console.log("🧠 Raw AI response:", rawContent); // helpful for debugging

//     // Try to extract JSON array
//     const jsonStart = rawContent.indexOf('[');
//     const jsonEnd = rawContent.lastIndexOf(']');
//     if (jsonStart === -1 || jsonEnd === -1) {
//       throw new Error("Response does not contain a valid JSON array.");
//     }

//     const jsonString = rawContent.substring(jsonStart, jsonEnd + 1);

//     const questions = JSON.parse(jsonString);

//     // Validate structure
//     if (!Array.isArray(questions) || questions.length === 0) {
//       throw new Error("Invalid format: expected non-empty array");
//     }

//     questions.forEach((q, i) => {
//       if (
//         typeof q.text !== 'string' ||
//         !Array.isArray(q.options) ||
//         typeof q.correctAnswer !== 'number'
//       ) {
//         throw new Error(`Question ${i + 1} has invalid structure`);
//       }
//     });

//     return questions;
//   } catch (error) {
//     console.error("❌ OpenAI Quiz Generation Failed:", error);
//     throw new Error("Failed to generate questions with AI");
//   }
// };



// server/services/openaiService.js
const axios = require("axios");

exports.generateQuizQuestions = async (topic, count = 5) => {
  try {
    const prompt = `Generate ${count} multiple-choice quiz questions about "${topic}". 
Format each question as a JSON object with:
- "text": the question
- "options": array of 4 strings (choices)
- "correctAnswer": number (0-3) indicating the correct option
- "explanation": a brief explanation
    
Return a valid JSON array of these objects ONLY, without extra text or comments.`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert quiz generator. Return only valid JSON in array format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // your OpenRouter key
          "Content-Type": "application/json"
        }
      }
    );

    const rawContent = response.data.choices[0]?.message?.content;

    const jsonStart = rawContent.indexOf("[");
    const jsonEnd = rawContent.lastIndexOf("]");
    const jsonString = rawContent.substring(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    return questions;
  } catch (error) {
    console.error("❌ OpenAI Quiz Generation Failed:", error.response?.data || error.message);
    throw new Error("Failed to generate questions with AI");
  }
};
