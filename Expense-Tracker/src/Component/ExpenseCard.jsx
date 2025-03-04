import React, { useEffect, useState } from "react";
import Button from "./Button";
import service from "../firebase/config";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeInDoc } from "../store/expenseSlice";
import UpdateExpense from "./UpdateExpense";
import { Spinner } from './index'

const ExpenseCard = ({ expense }) => {
    // console.log(expense.id);

    const [isModalOpen, setIsModalOpen] = useState(false)

    

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(false)

    const deleteDoc = async (e) => {
        setLoader(true)
        await service.deleteDoc(expense.id)
        dispatch(changeInDoc())
        setLoader(false)
    }    

    

    return (
        <>
            {loader ? <Spinner /> : <div className="dark:bg-gray-600 dark:text-white bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-semibold">{expense.data.expense_category}</h3>
                    <p className="dark:text-white text-black text-sm">{expense.data.expense_date}</p>
                    <Button onClick={() => setIsModalOpen(true)} className="mt-2 dark:text-yellow-800 border-amber-200 bg-amber-200 hover:opacity-80 cursor-pointer">Edit</Button>
                    <Button onClick={deleteDoc} className="mt-2 ml-2 dark:text-red-500 border-amber-200 bg-red-200 hover:opacity-80 cursor-pointer">Delete</Button>
                </div>
                <span className={expense.data.expense_type === "Income" ? "text-green-400 font-bold text-2xl" : "text-red-400 font-bold text-2xl"}>₹{expense.data.expense_amount}</span>
            </div>
            }

            {isModalOpen &&
                <UpdateExpense expense={expense.data} open={isModalOpen} id={expense.id}/>
            }
        </>
    );
};

export default ExpenseCard;
