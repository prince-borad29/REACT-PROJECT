import React from 'react';

const Button = ({ children, onClick, type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
