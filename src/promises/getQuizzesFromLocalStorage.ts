import { Quiz } from "../types";

export const getQuizzesFromLocalStorage = (): Promise<Quiz[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedQuizzes = localStorage.getItem("quizzes");
            const parsedQuizzes: Quiz[] = storedQuizzes ? JSON.parse(storedQuizzes) : [];
            resolve(parsedQuizzes);
        }, 500);
    });
};
