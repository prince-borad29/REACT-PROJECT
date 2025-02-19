import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder }) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-gray-700 font-medium">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Input;
