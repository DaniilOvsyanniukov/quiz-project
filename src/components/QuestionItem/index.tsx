import React, { useState } from 'react';
import { Question, Quiz } from '../../types';
import DeleteButton from '../Buttons/DeleteButton';
import EditButton from '../Buttons/EditButton';
// import AnswerList from './AnswerList';

interface Props {
    question: Question;
    onDelete: () => void;
    onEdit: () => void;
}

const QuestionItem: React.FC<Props> = ({ question, onDelete, onEdit }) => {
    const [editedText, setEditedText] = useState(question.text); 

    return (
        <li>
            <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            <EditButton onEdit={onEdit} />
            <DeleteButton onDelete={onDelete} />
        </li>
    );
};

export default QuestionItem;
