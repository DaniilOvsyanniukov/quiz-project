import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question, Answer, QuizProgress } from '../types';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/Buttons/MyButton';
import AnswerItem from '../components/AnswerItem';
import { getQuizzesFromLocalStorage } from '../promises/getQuizzesFromLocalStorage';
import { getQuizProgressFromLocalStorage } from '../promises/getQuizzesProgressFromLocalStorage';
interface QuizParams {
    id: string;
    [key: string]: string | undefined;
}

const TakeQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<QuizParams>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [userProgress, setUserProgress] = useState<QuizProgress>({
        quizId: "",
        time: 0,
        score: 0,
        answers: [],
    });

    useEffect(() => {
        if (!id) return;
        getQuizzesFromLocalStorage().then((storedQuizzes) => {
            const selectedQuiz = storedQuizzes.find(q => q.id === id);
            setQuiz(selectedQuiz || null);
        });
    
        getQuizProgressFromLocalStorage().then((storedProgress) => {
            const parsedProgress: QuizProgress[] = Array.isArray(storedProgress) ? storedProgress : [];
            const currentProgress = parsedProgress.find(progress => progress.quizId === id);
            if (currentProgress) {
                setUserProgress(currentProgress);
                setTimer(currentProgress.time);
            }
        });
    }, [id]);

    useEffect(() => {
        if (quiz) {
            const timerId = setInterval(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [quiz]);

    const handleAnswerSelect = (questionIndex: number, answerIndex: number | null) => {
        if (!userProgress) return;

        const updatedAnswers = [...userProgress.answers];
        updatedAnswers[questionIndex] = { questionIndex, answerIndex };
        setUserProgress(prevProgress => ({
            ...prevProgress,
            answers: updatedAnswers
        }));
    };

    const calculateScore = (): number => {
        let score = 0;
    
        if (!quiz) {
            return score;
        }
    
        userProgress.answers.forEach(userAnswer => {
            const question = quiz.questions[userAnswer.questionIndex];
            const correctAnswers = question.correctAnswers;
    
            if (!correctAnswers || correctAnswers.length === 0) {
                return;
            }
    
            const answeredIndex = userAnswer.answerIndex as number;
            const correctIndexes = correctAnswers.reduce((acc, isCorrect, index) => {
                if (isCorrect) {
                    acc.push(index);
                }
                return acc;
            }, [] as number[]);
    
            if (correctIndexes.includes(answeredIndex)) {
                score++;
            }
        });
        return score;
    };
    
    const handleSubmitQuiz = () => {
        getQuizProgressFromLocalStorage().then((storedProgress) => {
            const parsedProgress: QuizProgress[] = Array.isArray(storedProgress) ? storedProgress : [];
            const currentProgressIndex = parsedProgress.findIndex(progress => progress.quizId === id);
            const currentProgress = {
                quizId: id ?? "",
                time: timer,
                score: calculateScore(),
                answers: userProgress.answers
            };
            if (currentProgressIndex !== -1) {
                parsedProgress[currentProgressIndex] = currentProgress;
            } else {
                parsedProgress.push(currentProgress);
            }
            localStorage.setItem("quizProgress", JSON.stringify(parsedProgress));
            navigate(`/`);
        });
    };
    
    if (!quiz || !userProgress || !id) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">{quiz.name}</h1>
            <p className="text-lg text-center mb-6">Timer: {timer} seconds</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmitQuiz}
            >
                <Form className="space-y-6">
                    <FieldArray name="answers">
                        {() => (
                            <ul className="space-y-6">
                                {quiz.questions.map((question: Question, questionIndex: number) => (
                                    <li key={question.id} className="bg-white shadow-md rounded-lg p-4">
                                        <h3 className="text-xl font-semibold mb-2">{question.text}</h3>
                                        <ul className="space-y-2">
                                            {question.answers.map((answer: Answer, answerIndex: number) => (
                                                <AnswerItem 
                                                    key={answer.id}
                                                    answer={answer}
                                                    answerIndex={answerIndex}
                                                    questionIndex={questionIndex}
                                                    checkedAnswer={userProgress.answers[questionIndex]?.answerIndex === answerIndex}
                                                    handleAnswerSelect={() => handleAnswerSelect(questionIndex, answerIndex)}
                                                />
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FieldArray>
                    <div className="flex justify-center space-x-4">
                        <MyButton type="submit" buttonText="Submit Quiz" className="bg-green-500 hover:bg-green-700" />
                        <MyButton onClick={() => navigate(`/`)} buttonText="Cancel" className="bg-red-500 hover:bg-red-700" />
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default TakeQuizPage;
