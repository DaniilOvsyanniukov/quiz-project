export type Quiz = {
    id: string;
    name: string;
    questions: Question[];
};

export type Question = {
    id: string;
    text: string;
    answers: Answer[];
    correctAnswers: boolean[];
};

export type Answer = {
    id: string;
    text: string;
};

export type UserAnswer = {
    questionIndex: number;
    answerIndex: number | null;
}

export type QuizProgress ={
    quizId: string;
    time: number;
    score: number;
    answers: UserAnswer[];
}

