import { useState } from "react";
import {Input , Button } from "../Component/index";

const AddExpense = () => {
    const [expense, setExpense] = useState({ category: "", amount: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Expense Added:", expense);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
            <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <Input
                    label="Expense Category"
                    placeholder="Enter category"
                    value={expense.category}
                    onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                />
                <Input
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                />
                <Button type="submit" className="bg-purple-800 text-white mt-4">
                    Add Expense
                </Button>
            </form>
        </div>
    );
};

export default AddExpense;
