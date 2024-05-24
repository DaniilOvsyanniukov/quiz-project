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
    <li key={answerIndex}>
        <Field name={`questions[${questionIndex}].answers[${answerIndex}].text`} type="text" placeholder="Answer" />
        <Field
            name={`questions[${questionIndex}].correctAnswers[${answerIndex}]`}
            type="checkbox"
            checked={correctAnswers[answerIndex]}
        />
        <MyButton onClick={removeAnswer} buttonText="Delete Answer" className="ml-2" />
    </li>
);

export default EditAnswerItem;
