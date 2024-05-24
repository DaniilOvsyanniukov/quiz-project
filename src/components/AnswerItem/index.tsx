import React from 'react';
import { Field } from 'formik';
import { Answer } from '../../types';

interface AnswerProps {
    answer: Answer;
    answerIndex: number;
    questionIndex: number;
    checkedAnswer: boolean;
    handleAnswerSelect: (questionIndex: number, answerIndex: number | null) => void
}

const AnswerItem: React.FC<AnswerProps> = ({ answer, answerIndex, questionIndex, checkedAnswer, handleAnswerSelect }) => (
    <li key={answer.id}>
        <Field
            type="checkbox"
            name={`answers.${questionIndex}`}
            value={answerIndex}
            checked={checkedAnswer}
            onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
        />
        <label>{answer.text}</label>
    </li>
);

export default AnswerItem;
