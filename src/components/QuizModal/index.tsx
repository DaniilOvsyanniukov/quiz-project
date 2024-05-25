import React from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import Modal from 'react-modal';
import { Quiz } from '../../types';
import QuestionItem from '../QuestionItem';
import MyButton from '../Buttons/MyButton';
import { getQuizzesFromLocalStorage } from '../../promises/getQuizzesFromLocalStorage';

interface ModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    quiz: Quiz | null;
    updateQuizzes: () => void;
}

const QuizModal: React.FC<ModalProps> = ({ isOpen, onRequestClose, quiz, updateQuizzes }) => {
    const initialValues: Quiz = quiz || { id: '', name: '', questions: [] };

    const handleSubmit = (values: Quiz) => {
        if (quiz) {
            getQuizzesFromLocalStorage().then((storedQuizzes) => {
                const updatedQuizzes = storedQuizzes.map((storedQuiz: Quiz) => {
                    if (storedQuiz.id === quiz.id) {
                        return { ...values, id: quiz.id };
                    }
                    return storedQuiz;
                });
                localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
                updateQuizzes();
                onRequestClose();
            });
        } else {
            getQuizzesFromLocalStorage().then((storedQuizzes) => {
                const newQuiz: Quiz = { ...values, id: Date.now().toString() };
                storedQuizzes.push(newQuiz);
                localStorage.setItem('quizzes', JSON.stringify(storedQuizzes));
                updateQuizzes();
                onRequestClose();
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{quiz ? 'Edit Quiz' : 'Add New Quiz'}</h2>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Quiz Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Quiz Name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="border rounded px-3 py-2"
                                />
                            </div>
                            <FieldArray name="questions">
                                {({ push, remove }) => (
                                    <ul className="space-y-4">
                                        {values.questions.map((_, index) => (
                                            <QuestionItem key={index} index={index} remove={() => remove(index)} values={values} />
                                        ))}
                                        <MyButton
                                            onClick={() => push({ id: Date.now().toString(), text: '', answers: [], correctAnswers: [] })}
                                            buttonText="Add Question"
                                            className="ml-2"
                                        />
                                    </ul>
                                )}
                            </FieldArray>
                            <div className="flex justify-end space-x-4">
                                <MyButton type="submit" buttonText="Apply" className="bg-green-500 hover:bg-green-700" />
                                <MyButton type="button" onClick={onRequestClose} buttonText="Cancel" className="bg-red-500 hover:bg-red-700" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default QuizModal;
