import React from 'react';

interface Props {
    onEdit: () => void;
}

const EditButton: React.FC<Props> = ({ onEdit }) => {
    return (
        <button onClick={onEdit}>Edit</button>
    );
};

export default EditButton;
