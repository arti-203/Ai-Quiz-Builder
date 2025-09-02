// import React, { useState, useEffect } from 'react';
// import { getResults } from '../../services/api';

// export default function Results({ quizId, isTeacher = false }) {
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await getResults(quizId);
//         setResults(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to fetch results:', err);
//         setLoading(false);
//       }
//     };
    
//     fetchResults();
//   }, [quizId]);

//   if (loading) return <div>Loading results...</div>;
//   if (!results) return <div>No results available</div>;

//   return (
//     <div className="results-container">
//       <h2>{isTeacher ? 'Quiz Results' : 'Your Results'}</h2>
      
//       {isTeacher && (
//         <div className="overall-stats">
//           <div className="stat-card">
//             <h3>{results.students.length}</h3>
//             <p>Students Participated</p>
//           </div>
//           <div className="stat-card">
//             <h3>{results.averageScore}%</h3>
//             <p>Average Score</p>
//           </div>
//           <div className="stat-card">
//             <h3>{results.topScore}%</h3>
//             <p>Top Score</p>
//           </div>
//         </div>
//       )}
      
//       <div className="detailed-results">
//         <h3>Question Analysis</h3>
//         <div className="questions-analysis">
//           {results.questions.map((question, qIndex) => (
//             <div key={qIndex} className="question-analysis">
//               <p><strong>Question {qIndex + 1}:</strong> {question.text}</p>
//               <div className="answer-distribution">
//                 {question.options.map((option, oIndex) => (
//                   <div key={oIndex} className="option-distribution">
//                     <div className="option-header">
//                       <span>{String.fromCharCode(65 + oIndex)}</span>
//                       {oIndex === question.correctAnswer && (
//                         <span className="correct-indicator">✓</span>
//                       )}
//                     </div>
//                     <div className="distribution-bar-container">
//                       <div 
//                         className={`distribution-bar ${oIndex === question.correctAnswer ? 'correct' : 'incorrect'}`}
//                         style={{ width: `${question.answerDistribution[oIndex] || 0}%` }}
//                       >
//                         {question.answerDistribution[oIndex] || 0}%
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="leaderboard">
//         <h3>Leaderboard</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Rank</th>
//               <th>Student</th>
//               <th>Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.leaderboard.map((student, index) => (
//               <tr key={student._id}>
//                 <td>{index + 1}</td>
//                 <td>{student.name}</td>
//                 <td>{student.score}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { getResults } from '../../services/api';

export default function Results({ quizId, isTeacher = false }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getResults(quizId);
        setResults(response.data);
      } catch (err) {
        console.error('Failed to fetch results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  if (loading) return <div>Loading results...</div>;
  if (!results) return <div>No results available</div>;

  const students = results.students || [];
  const questions = Array.isArray(results.questions) ? results.questions : [];
  const leaderboard = Array.isArray(results.leaderboard) ? results.leaderboard : [];

  return (
    <div className="results-container">
      <h2>{isTeacher ? 'Quiz Results' : 'Your Results'}</h2>

      {isTeacher && (
        <div className="overall-stats">
          <div className="stat-card">
            <h3>{students.length}</h3>
            <p>Students Participated</p>
          </div>
          <div className="stat-card">
            <h3>{results.averageScore ?? 0}%</h3>
            <p>Average Score</p>
          </div>
          <div className="stat-card">
            <h3>{results.topScore ?? 0}%</h3>
            <p>Top Score</p>
          </div>
        </div>
      )}

      {questions.length > 0 && (
        <div className="detailed-results">
          <h3>Question Analysis</h3>
          <div className="questions-analysis">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="question-analysis">
                <p><strong>Question {qIndex + 1}:</strong> {question.text}</p>
                <div className="answer-distribution">
                  {(question.options || []).map((option, oIndex) => (
                    <div key={oIndex} className="option-distribution">
                      <div className="option-header">
                        <span>{String.fromCharCode(65 + oIndex)}</span>
                        {oIndex === question.correctAnswer && (
                          <span className="correct-indicator">✓</span>
                        )}
                      </div>
                      <div className="distribution-bar-container">
                        <div
                          className={`distribution-bar ${oIndex === question.correctAnswer ? 'correct' : 'incorrect'}`}
                          style={{ width: `${question.answerDistribution?.[oIndex] || 0}%` }}
                        >
                          {question.answerDistribution?.[oIndex] || 0}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {leaderboard.length > 0 && (
        <div className="leaderboard">
          <h3>Leaderboard</h3>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((student, index) => (
                <tr key={student._id || index}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
