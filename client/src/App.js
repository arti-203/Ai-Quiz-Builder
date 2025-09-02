// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { SocketProvider } from './contexts/SocketContext';
// import Dashboard from './components/teacher/Dashboard';
// import QuizCreator from './components/teacher/QuizCreator';
// import LiveQuiz from './components/teacher/LiveQuiz';
// import JoinQuiz from './components/student/JoinQuiz';
// import QuizInterface from './components/student/QuizInterface';
// import Results from './components/common/Results';
// import Login from './components/Login';
// import { Navigate } from 'react-router-dom';


// const PrivateRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem('user');
//   return isLoggedIn ? children : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <SocketProvider>
//       <Router>
//         <div className="app">
//           <Routes>
//             {/* Teacher Routes */}
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/create" element={<QuizCreator />} />
//             <Route path="/live/:id" element={<LiveQuiz />} />
//             <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//             {/* Student Routes */}
//             <Route path="/join" element={<JoinQuiz />} />
//             <Route path="/student/quiz/:id" element={<QuizInterface />} />
//             <Route path="/student/results/:id" element={<Results />} />
//           </Routes>
//         </div>
//       </Router>
//     </SocketProvider>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';

import Dashboard from './components/teacher/Dashboard';
import QuizCreator from './components/teacher/QuizCreator';
import LiveQuiz from './components/teacher/LiveQuiz';
import JoinQuiz from './components/student/JoinQuiz';
import QuizInterface from './components/student/QuizInterface';
import Results from './components/common/Results';
import Login from './components/Login';




const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user');
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  return (
    <SocketProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Route: Login */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><QuizCreator /></PrivateRoute>} />
            <Route path="/live/:id" element={<PrivateRoute><LiveQuiz /></PrivateRoute>} />

            {/* Student Routes (not protected) */}
            <Route path="/join" element={<JoinQuiz />} />
            <Route path="/student/quiz/:id" element={<QuizInterface />} />
            <Route path="/student/results/:id" element={<Results />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
