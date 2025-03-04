import React from 'react';

const Button = ({ children, onClick ,type = "button", className = "" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base md:text-md ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
