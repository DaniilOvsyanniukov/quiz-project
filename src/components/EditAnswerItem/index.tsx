import React from 'react';
import { Field } from 'formik';
import MyButton from '../Buttons/MyButton';

interface EditAnswerProps {
    answerIndex: number;
    questionIndex: number;
    correctAnswers: boolean[];
    removeAnswer: () => void;
}

const EditAnswerItem: React.FC<EditAnswerProps> = ({ answerIndex, questionIndex, correctAnswers, removeAnswer }) => (
    <li key={answerIndex} className="flex items-center space-x-4 mb-2">
        <Field
            name={`questions[${questionIndex}].answers[${answerIndex}].text`}
            type="text"
            placeholder="Answer"
            className="flex-grow border rounded px-3 py-2"
        />
        <label className="flex items-center space-x-2">
            <Field
                name={`questions[${questionIndex}].correctAnswers[${answerIndex}]`}
                type="checkbox"
                checked={correctAnswers[answerIndex]}
                className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Correct</span>
        </label>
        <MyButton onClick={removeAnswer} buttonText="Delete Answer" className="ml-2 bg-red-500 hover:bg-red-700 text-white" />
    </li>
);

export default EditAnswerItem;
