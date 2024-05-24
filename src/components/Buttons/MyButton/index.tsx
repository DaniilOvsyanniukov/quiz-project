import React from 'react';

interface Props {
    onClick?: () => void;
    buttonText: string;
    className?: string; 
    type?: "button" | "submit" | "reset";
}

const MyButton: React.FC<Props> = ({ onClick = () => {}, buttonText, className, type = "button" }) => {
    const handleAdd = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        onClick();
    };

    return (
        <button type={type} onClick={handleAdd} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}>
            {buttonText}
        </button>
    );
};

export default MyButton;
