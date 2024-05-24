import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    quizId: string;
}

const StartQuizButton: React.FC<Props> = ({ quizId }) => {
    return (
        <Link to={`/take-quiz/${quizId}`}>Start</Link>
    );
};

export default StartQuizButton;