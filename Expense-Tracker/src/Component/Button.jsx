import React from 'react';

const Button = ({ children, onClick ,type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-3 py-1  text-xl md:text-md rounded-lg font-semibold transition-all  ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
