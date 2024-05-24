import React, { useEffect, useState } from 'react';
import { Quiz } from '../types';
import { getQuizzesFromLocalStorage } from '../promises/getQuizzesFromLocalStorage';
import QuizItem from '../components/QuizItem';
import AddButton from '../components/Buttons/AddButton';

const HomePage: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isCreateQuizFormOpen, setIsCreateQuizFormOpen] = useState<boolean>(false);


    useEffect(() => {
        getQuizzesFromLocalStorage().then((data) => {
            setQuizzes(data);
        });
    }, []);

    const deleteQuizFromLocalStorage = (quizId: string): void => {
        if (quizzes) {
            const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quizId);
            localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
        }
    };
    const handleFormOpen =()=>{
        setIsCreateQuizFormOpen(!isCreateQuizFormOpen)
    }

    return (
        <div>
            <h1>Список вікторин</h1>
            <AddButton onAdd = {()=> handleFormOpen()}/>
            <ul>
                {quizzes.map(quiz => (
                    <QuizItem key={quiz.id} quiz={quiz} onDelete={() => deleteQuizFromLocalStorage(quiz.id)} />
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
