import React from "react";
import Button from "./Button";

const ExpenseCard = ({ expense }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
            <div>
                <h3 className="text-lg font-semibold">{expense.category}</h3>
                <p className="text-gray-500">{expense.date}</p>
                <Button className="mt-2 border-amber-200 bg-amber-200 hover:opacity-80 cursor-pointer">Edit</Button>
                <Button className="mt-2 ml-2 border-amber-200 bg-red-200 hover:opacity-80 cursor-pointer">Delete</Button>
            </div>
            <span className="text-red-500 font-bold">${expense.amount}</span>
        </div>
    );
};

export default ExpenseCard;
