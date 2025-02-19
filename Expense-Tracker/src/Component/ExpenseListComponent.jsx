import React from "react";
import ExpenseCard from "./ExpenseCard";

const ExpenseListComponent = ({ expenses }) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg">
            {expenses.length > 0 ? (
                expenses.map((expense, index) => <ExpenseCard key={index} expense={expense} />)
            ) : (
                <p className="text-gray-500">No expenses recorded.</p>
            )}
        </div>
    );
};

export default ExpenseListComponent;
