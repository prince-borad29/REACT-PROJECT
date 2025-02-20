import React from "react";
import Button from "./Button";
import service from "../firebase/config";
import { useNavigate } from "react-router";

const ExpenseCard = ( {expense}) => {
    // console.log(expense);

    const navigate = useNavigate()

    const deleteDoc = async (e) => {
       await service.deleteDoc(expense.id)
       navigate("/")
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
            <div>
                <h3 className="text-lg font-semibold">{expense.data.expense_category}</h3>
                {/* <p className="text-gray-500">{expense.date}</p> */}
                <Button className="mt-2 border-amber-200 bg-amber-200 hover:opacity-80 cursor-pointer">Edit</Button>
                <Button onClick={deleteDoc} className="mt-2 ml-2 border-amber-200 bg-red-200 hover:opacity-80 cursor-pointer">Delete</Button>
            </div>
            <span className="text-red-500 font-bold">${expense.data.expense_amount}</span>
        </div>
    );
};

export default ExpenseCard;
