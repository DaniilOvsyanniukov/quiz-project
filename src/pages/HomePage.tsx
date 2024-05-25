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
    const [searchQuery, setSearchQuery] = useState<string>('');

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

    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-4">Quiz List</h1>
            <div className="mb-4 w-full max-w-4xl">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search quiz by name..."
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                />
            </div>
            <MyButton onClick={() => handleFormOpen()} buttonText="Add Quiz" className="mb-4" />
            <ul className="w-full max-w-4xl">
                {filteredQuizzes.map((quiz) => {
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
