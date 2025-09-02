// import React, { useState } from 'react';
// import { generateQuiz } from '../../services/api';

// export default function QuizCreator() {
//   const [topic, setTopic] = useState('');
//   const [questionCount, setQuestionCount] = useState(5);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsGenerating(true);
//     try {
//       const quiz = await generateQuiz({ topic, questionCount });
//       // Redirect to quiz dashboard
//     } catch (err) {
//       console.error(err);
//     }
//     setIsGenerating(false);
//   };

//   return (
//     <div className="quiz-creator">
//       <h2>Create New Quiz</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={topic}
//           onChange={(e) => setTopic(e.target.value)}
//           placeholder="Enter topic"
//           required
//         />
//         <input
//           type="number"
//           value={questionCount}
//           onChange={(e) => setQuestionCount(e.target.value)}
//           min="1"
//           max="20"
//         />
//         <button type="submit" disabled={isGenerating}>
//           {isGenerating ? 'Generating...' : 'Create Quiz'}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { createQuiz } from '../../services/api';
import '../../styles/create.css';
import '../../styles/QuizCreator.css';

export default function QuizCreator() {
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(5);
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quiz, setQuiz] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const quizData = { topic, questionCount, title };
      const response = await createQuiz(quizData);
      setQuiz(response.data);
    } catch (err) {
      console.error('Failed to generate quiz:', err);
    }
    setIsGenerating(false);
  };

//   return (
//     <div className="quiz-creator">
//       <h2>Create AI-Powered Quiz</h2>
      
//       {quiz ? (
//         <div className="quiz-created">
//           <h3>Quiz Created!</h3>
//           <p>Room Code: <strong>{quiz.roomCode}</strong></p>
//           <button onClick={() => window.location = `/live/${quiz._id}`}>
//             Start Live Quiz
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Quiz Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter quiz title"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Topic</label>
//             <input
//               type="text"
//               value={topic}
//               onChange={(e) => setTopic(e.target.value)}
//               placeholder="Enter topic (e.g., World History)"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Number of Questions</label>
//             <input
//               type="number"
//               value={questionCount}
//               onChange={(e) => setQuestionCount(e.target.value)}
//               min="1"
//               max="20"
//             />
//           </div>
          
//           <button type="submit" disabled={isGenerating}>
//             {isGenerating ? 'Generating Quiz...' : 'Create Quiz with AI'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

return (
  <div className="create-quiz-background">
    <div className="quiz-form">
      <h2>Create AI-Powered Quiz</h2>

      {quiz ? (
        <div className="quiz-created">
          <h3>Quiz Created!</h3>
          <p>Room Code: <strong>{quiz.roomCode}</strong></p>
          <button onClick={() => window.location = `/live/${quiz._id}`}>
            Start Live Quiz
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
              required
            />
          </div>

          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., World History)"
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Questions</label>
            <input
              type="number"
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              min="1"
              max="20"
            />
          </div>

          <button type="submit" disabled={isGenerating}>
            {isGenerating ? 'Generating Quiz...' : 'Create Quiz with AI'}
          </button>
        </form>
      )}
    </div>
  </div>
);
}