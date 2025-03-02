import { useState } from "react";
import {Input , Button, Spinner, RadioButtonGroup } from "../Component/index";
import service from "../firebase/config";
import {useForm} from 'react-hook-form'
import { useSelector } from "react-redux";

const AddExpense = () => {
    const [loader,setLoader] = useState(false)

    const {register,handleSubmit,reset,control} = useForm()
    const uid = useSelector(state => state.expenseReducer.uid)

    const addData = async (data) => {
        setLoader(true)
        console.log(data);
        
        try {
             await service.createDoc(data.category,data.amount,data.date,data.type,uid)
             reset()
            setLoader(false)
        } catch (error) {
            console.log("error ::"+error);
        }

    };


    return (
        <>
            {loader ? <Spinner/>: <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
                <form onSubmit={handleSubmit(addData)} className="dark:bg-gray-600 dark:text-white bg-amber-50 p-6 rounded-lg shadow-md">
                    <Input
                        // label="Expense Category"
                        placeholder="Enter category"
                        {...register("category", {required: "Category Is Required"})}
                    />
                    <RadioButtonGroup name="type" control={control} defaultValue="Expense" />
                    <Input
                        // label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        {...register("amount", {required: "Amount Is Required" })}
                    />
                    <Input 
                    type="date"
                        {...register("date", { required: "Date Is Required" })}
                    />
                    <Button type="submit" className="dark:bg-gray-800 bg-purple-800 text-white mt-4 hover:opacity-80 cursor-pointer">
                        Add Expense
                    </Button>
                </form>
            </div>
            }
        
        </>
    );
};

export default AddExpense;
