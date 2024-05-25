import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TakeQuizPage from './pages/TakeQuizPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/take-quiz/:id" element={<TakeQuizPage />} />
            </Routes>
        </Router>
    );
};

export default App;
