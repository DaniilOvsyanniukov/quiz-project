export type Quiz = {
    id: string;
    name: string;
    questions: Question[];
};

export type Question = {
    id: string;
    text: string;
    answers: Answer[];
    correctAnswers: number[];
};

export type Answer = {
    id: string;
    text: string;
};
