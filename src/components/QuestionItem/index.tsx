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
        <li key={index}>
            <Field name={`questions[${index}].text`} type="text" placeholder="Question" />
            <MyButton onClick={remove} buttonText="Delete Question" className="ml-2" />
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
                        <MyButton onClick={() => pushAnswer({ id: Date.now().toString(), text: '', correct: false })}
                            buttonText="Add Answer" 
                            className="ml-2" />
                    </ul>
                )}
            </FieldArray>
        </li>
    );
};

export default QuestionItem;
