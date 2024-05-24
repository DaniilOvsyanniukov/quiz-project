import React from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import Modal from 'react-modal';
import { Quiz } from '../../types';
import QuestionItem from '../QuestionItem';
import MyButton from '../Buttons/MyButton';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    quiz: Quiz | null;
    updateQuizzes: () => void
}

const QuizModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, quiz, updateQuizzes }) => {
    const initialValues: Quiz = quiz || { id: '', name: '', questions: [] };

    const handleSubmit = (values: Quiz) => {
        if (quiz) {
            const updatedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]').map((storedQuiz: Quiz) => {
                if (storedQuiz.id === quiz.id) {
                    return { ...values, id: quiz.id };
                }
                return storedQuiz;
            });
            localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
        } else {
            const newQuiz: Quiz = { ...values, id: Date.now().toString() };
            const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            storedQuizzes.push(newQuiz);
            localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));
        }
        updateQuizzes()
        onRequestClose();
        
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Додати нову вікторину</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Field
                            type="text"
                            name="name"
                            placeholder="Quiz Name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <FieldArray name="questions">
                            {({ push, remove }) => (
                                <ul>
                                    {values.questions.map((_, index) => (
                                        <QuestionItem key={index} index={index} remove={() => remove(index)} values={values} />
                                    ))}
                                    <MyButton onClick={() => push({ id: Date.now().toString(), text: '', answers: [], correctAnswers: [] })}
                                        buttonText="Add Question"
                                        className="ml-2" />
                                </ul>
                            )}
                        </FieldArray>
                        <MyButton type="submit" buttonText="Apply" />
                        <MyButton type="button" onClick={onRequestClose} buttonText="Cancel" />
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default QuizModal;
