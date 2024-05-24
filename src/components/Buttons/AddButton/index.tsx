import React from 'react';

interface Props {
    onAdd: () => void;
}

const AddButton: React.FC<Props> = ({ onAdd }) => {
    return (
        <button onClick={onAdd}>Add</button>
    );
};

export default AddButton;
