import React from 'react';
import { FieldArray, Field } from 'formik';
import AnswerItem from '../EditAnswerItem';
import MyButton from '../Buttons/MyButton';
import { Answer } from '../../types';

interface QuestionProps {
    index: number;
    remove: () => void;
    values: any;
}

const QuestionItem: React.FC<QuestionProps> = ({ index, remove, values }) => {
    return (
        <li key={index} className="p-4 mb-4 bg-white rounded shadow">
            <Field
                name={`questions[${index}].text`}
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded mb-2"
            />
            <div className="flex justify-end mb-2">
                <MyButton onClick={remove} buttonText="Delete Question" className="bg-red-500 hover:bg-red-700 text-white" />
            </div>
            <FieldArray name={`questions[${index}].answers`}>
                {({ push: pushAnswer, remove: removeAnswer }) => (
                    <ul>
                        {values.questions[index].answers.map((answer: Answer, answerIndex: number) => (
                            <AnswerItem
                                key={answer.id}
                                questionIndex={index}
                                answerIndex={answerIndex}
                                removeAnswer={() => removeAnswer(answerIndex)}
                                correctAnswers={values.questions[index].correctAnswers}
                            />
                        ))}
                        <div className="flex justify-end mt-2">
                            <MyButton
                                onClick={() => pushAnswer({ id: Date.now().toString(), text: '', correct: false })}
                                buttonText="Add Answer"
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                            />
                        </div>
                    </ul>
                )}
            </FieldArray>
        </li>
    );
};

export default QuestionItem;
