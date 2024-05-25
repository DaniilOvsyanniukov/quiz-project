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
    <li key={answer.id} className="flex items-center space-x-2 p-2 border rounded-md mb-2">
        <Field
            type="checkbox"
            name={`answers.${questionIndex}`}
            value={answerIndex}
            checked={checkedAnswer}
            onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
            className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">{answer.text}</label>
    </li>
);

export default AnswerItem;
