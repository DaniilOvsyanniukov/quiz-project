import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question, Answer, QuizProgress } from '../types';
import { Formik, Form, FieldArray } from 'formik';
import { useNavigate } from 'react-router-dom';
import MyButton from '../components/Buttons/MyButton';
import AnswerItem from '../components/AnswerItem';

interface QuizParams {
    id: string;
    [key: string]: string | undefined;
}

const TakeQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<QuizParams>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [userProgress, setUserProgress] = useState<QuizProgress>(
        {
            quizId: "",
            time: 0,
            score: 0,
            answers:[],
        }
    );

    useEffect(() => {
        if (!id) return;
        const storedQuizzes = localStorage.getItem("quizzes");
        const parsedQuizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        const selectedQuiz = parsedQuizzes.find(q => q.id === id);
        setQuiz(selectedQuiz || null);

        const storedProgress = localStorage.getItem("quizProgress");
        const parsedProgress: QuizProgress[] = storedProgress ? JSON.parse(storedProgress) : [];
        const currentProgress = parsedProgress.find(progress => progress.quizId === id);
        if (currentProgress) {
            setUserProgress(currentProgress);
            setTimer(currentProgress.time);
        }
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
        const storedProgress = localStorage.getItem("quizProgress");
        const parsedProgress: QuizProgress[] = storedProgress ? JSON.parse(storedProgress) : [];
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
        navigate(`/`)
    };
    
    if (!quiz || !userProgress || !id) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.name}</h1>
            <p>Timer: {timer} seconds</p>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmitQuiz}
            >
                <Form>
                    <FieldArray name="answers">
                        {() => (
                            <ul>
                                {quiz.questions.map((question: Question, questionIndex: number) => (
                                    <li key={question.id}>
                                        <h3>{question.text}</h3>
                                        <ul>
                                            {question.answers.map((answer: Answer, answerIndex: number) => (
                                                <AnswerItem 
                                                key={answer.id}
                                                answer={answer}
                                                answerIndex={answerIndex}
                                                questionIndex={questionIndex}
                                                checkedAnswer={userProgress.answers[questionIndex]?.answerIndex === answerIndex}
                                                handleAnswerSelect={() => handleAnswerSelect(questionIndex, answerIndex)}/>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FieldArray>
                    <MyButton type="submit" buttonText="Submit Quiz" />
                    <MyButton onClick={() => navigate(`/`)} buttonText="Cancel" className="ml-2" />
                </Form>
            </Formik>
        </div>
    );
};

export default TakeQuizPage;
