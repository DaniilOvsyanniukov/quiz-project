import { QuizProgress } from "../types";

export const getQuizProgressFromLocalStorage = (): Promise<QuizProgress | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const storedProgress = localStorage.getItem(`quizProgress`);
            const parsedProgress: QuizProgress | null = storedProgress ? JSON.parse(storedProgress) : null;
            resolve(parsedProgress);
        }, 500);
    });
};
