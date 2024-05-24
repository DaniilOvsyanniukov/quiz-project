import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question, Answer } from '../types';

interface QuizParams {
    id: string;
    [key: string]: string | undefined;
}

const TakeQuizPage: React.FC = () => {
    const { id } = useParams<QuizParams>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        const storedQuizzes = localStorage.getItem("quizzes");
        const parsedQuizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        const selectedQuiz = parsedQuizzes.find(q => q.id === id);
        setQuiz(selectedQuiz || null);
    }, [id]);

    useEffect(() => {
        if (quiz) {
            const timerId = setTimeout(() => {
                setTimer(prevTime => prevTime + 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [quiz, timer]);

    const handleAnswerSelect = (questionId: string, answerIndex: number) => {
        setSelectedAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            const questionIndex = parseInt(questionId, 10);
            newAnswers[questionIndex] = answerIndex;
            return newAnswers;
        });
    };

    const handleSubmitQuiz = () => {
        if (quiz) {
            let currentScore = 0;
            quiz.questions.forEach((question: Question, index: number) => {
                if (selectedAnswers[index] === question.correctAnswers[0]) {
                    currentScore++;
                }
            });
            setScore(currentScore);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{quiz.name}</h1>
            <p>Timer: {timer} seconds</p>
            <ul>
                {quiz.questions.map((question: Question, index: number) => (
                    <li key={question.id}>
                        <h3>{question.text}</h3>
                        <ul>
                            {question.answers.map((answer: Answer, answerIndex: number) => (
                                <li key={answer.id}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={answerIndex}
                                        onChange={() => handleAnswerSelect(question.id, answerIndex)}
                                    />
                                    <label>{answer.text}</label>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            {score !== null && <p>Your score: {score}</p>}
        </div>
    );
};

export default TakeQuizPage;
