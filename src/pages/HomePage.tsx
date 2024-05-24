import React, { useEffect, useState } from 'react';
import { Quiz, QuizProgress } from '../types';
import QuizItem from '../components/QuizItem';
import MyButton from '../components/Buttons/MyButton';
import mockData from './mockData.json';
import QuizModal from '../components/QuizModal';
import { getQuizzesFromLocalStorage } from '../promises/getQuizzesFromLocalStorage';
import { getQuizProgressFromLocalStorage } from '../promises/getQuizzesProgressFromLocalStorage';

const HomePage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [progress, setProgress] = useState<QuizProgress[] | null>([]);
    const [isCreateQuizFormOpen, setIsCreateQuizFormOpen] = useState<boolean>(false);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        getQuizzesFromLocalStorage().then((quizzesFromStorage) => {
            if (quizzesFromStorage.length === 0) {
                localStorage.setItem('quizzes', JSON.stringify(mockData));
                setQuizzes(mockData);
            } else {
                setQuizzes(quizzesFromStorage);
            }
        });
        getQuizProgressFromLocalStorage().then((progressFromStorage) => {
            if (progressFromStorage !== null) {
                setProgress(Array.isArray(progressFromStorage) ? progressFromStorage : [progressFromStorage]);
            }
        });
    }, []);
    
    

    const deleteQuizFromLocalStorage = (quizId: string): void => {
        const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== quizId);
        setQuizzes(updatedQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
    };

    const handleFormOpen = (quiz?: Quiz) => {
        setIsCreateQuizFormOpen(true);
        setEditingQuiz(quiz || null);
    };

    const updateQuizzes = () => {
        getQuizzesFromLocalStorage().then((quizzesFromStorage) => {
            setQuizzes(quizzesFromStorage);
        });
    };

    return (
        <div>
            <h1>Quiz List</h1>
            <MyButton onClick={() => handleFormOpen()} buttonText="Add Quiz" className="ml-2" />
            <ul>
                {quizzes.map((quiz) => {
                    const quizProgress = progress?.find((item) => item.quizId === quiz.id);
                    return (
                        <QuizItem
                            key={quiz.id}
                            quiz={quiz}
                            progress={quizProgress ? quizProgress : null}
                            onDelete={() => deleteQuizFromLocalStorage(quiz.id)}
                            onEdit={() => handleFormOpen(quiz)}
                        />
                    );
                })}
            </ul>
            <QuizModal isOpen={isCreateQuizFormOpen} onRequestClose={() => setIsCreateQuizFormOpen(false)} quiz={editingQuiz} updateQuizzes={updateQuizzes}/>
        </div>
    );
};

export default HomePage;
