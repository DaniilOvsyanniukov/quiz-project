import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz, QuizProgress } from '../../types';
import MyButton from '../Buttons/MyButton';
import { useNavigate } from 'react-router-dom';

interface Props {
    quiz: Quiz;
    onDelete: ()=> void;
    onEdit: ()=> void;
    progress?: QuizProgress | null
}

const QuizItem: React.FC<Props> = ({ quiz, onDelete, onEdit, progress}) => {
    const navigate = useNavigate();
    const renderScore = () => {
        if (!progress || progress.score === undefined) {
            return <label>Take the quiz to find out your score</label>;
        } else {
            return <label>Your score: {progress.score}</label>;
        }
    };

    return (
        <li key={quiz.id}>
            <Link to={`/take-quiz/${quiz.id}`}>{quiz.name}</Link>
            {renderScore()}
            <MyButton onClick={onEdit} buttonText="Edit" className="ml-2" />
            <MyButton onClick={onDelete} buttonText="Delete" className="ml-2" />
            <MyButton onClick={() => navigate(`/take-quiz/${quiz.id}`)} buttonText="Start" className="ml-2" />
        </li>
    );
};

export default QuizItem;