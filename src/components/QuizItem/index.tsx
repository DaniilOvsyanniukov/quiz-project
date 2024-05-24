import React from 'react';
import { Link } from 'react-router-dom';
import { Quiz } from '../../types';
import DeleteButton from '../Buttons/DeleteButton';
import StartQuizButton from '../Buttons/StartQuizButton';

interface Props {
    quiz: Quiz;
    onDelete: ()=> void;
}

const QuizItem: React.FC<Props> = ({ quiz, onDelete }) => {
    return (
        <li key={quiz.id}>
            <Link to={`/take-quiz/${quiz.id}`}>{quiz.name}</Link>
            <Link to={`/edit-quiz/${quiz.id}`}>Редагувати</Link>
            <DeleteButton onDelete={onDelete}/>
            <StartQuizButton quizId={quiz.id} />
        </li>
    );
};

export default QuizItem;