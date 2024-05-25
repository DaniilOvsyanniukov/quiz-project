import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz, QuizProgress } from '../../types';
import MyButton from '../Buttons/MyButton';
import { useNavigate } from 'react-router-dom';

interface Props {
    quiz: Quiz;
    onDelete: () => void;
    onEdit: () => void;
    progress?: QuizProgress | null;
}

const QuizItem: React.FC<Props> = ({ quiz, onDelete, onEdit, progress }) => {
    const navigate = useNavigate();

    const renderScore = () => {
        if (!progress || progress.score === undefined) {
            return <label className="text-gray-500">Take the quiz to find out your score</label>;
        } else {
            return <label className="text-green-500">Your score: {progress.score}</label>;
        }
    };

    const renderTime = () => {
        if (progress && progress.time > 0) {
            return <label className="text-gray-500">Time: {progress.time} seconds</label>;
        }
        return null;
    };

    return (
        <li className="w-full max-w-screen-md mx-auto my-4 p-4 bg-white shadow-lg rounded-lg flex justify-between items-center h-24">
            <div>
                <Link to={`/take-quiz/${quiz.id}`} className="text-blue-600 text-lg font-semibold hover:underline">{quiz.name}</Link>
                <div className="mt-2">
                    {renderScore()}
                    {progress && progress.time > 0 && <div style={{ marginTop: '0.5rem' }}>{renderTime()}</div>}
                </div>
            </div>
            <div className="flex space-x-2">
                <MyButton onClick={onEdit} buttonText="Edit" className="bg-yellow-500 hover:bg-yellow-600 text-white" />
                <MyButton onClick={onDelete} buttonText="Delete" className="bg-red-500 hover:bg-red-600 text-white" />
                <MyButton onClick={() => navigate(`/take-quiz/${quiz.id}`)} buttonText="Start" className="bg-blue-500 hover:bg-blue-600 text-white" />
            </div>
        </li>
    );
};

export default QuizItem;
