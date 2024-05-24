import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Quiz, Question } from '../types';
import QuestionItem from '../components/QuestionItem';

interface QuizParams {
    id: string;
    [key: string]: string | undefined;
}

const EditQuizPage: React.FC = () => {
    const { id } = useParams<QuizParams>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [parsedQuizzes, setParsedQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        const storedQuizzes = localStorage.getItem("quizzes");
        const parsedQuizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
        const selectedQuiz = parsedQuizzes.find(q => q.id === id);
        setQuiz(selectedQuiz || null);
        setParsedQuizzes(parsedQuizzes);
    }, [id]);

    const deleteQuestion = (questionId: string) => {
        if (quiz) {
            const updatedQuestions = quiz.questions.filter(q => q.id !== questionId);
            const updatedQuiz: Quiz = { ...quiz, questions: updatedQuestions };
            const updatedQuizzes = parsedQuizzes.map(q => (q.id === id ? updatedQuiz : q));
            localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
            setQuiz(updatedQuiz);
        }
    };

    const hendleModalOpen = ()=> {
        setIsFormOpen(!isFormOpen)
    }

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Quiz: {quiz.name}</h1>
            <ul>
                {quiz.questions.map((question: Question) => (
                    <QuestionItem 
                        key={question.id}
                        question={question} 
                        onDelete={() => deleteQuestion(question.id)} 
                        onEdit={hendleModalOpen} 
                    />
                ))}
            </ul>
        </div>
    );
};

export default EditQuizPage;
