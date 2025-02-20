import { useState } from "react";
import {Input , Button, Spinner } from "../Component/index";
import service from "../firebase/config";
import {useForm} from 'react-hook-form'

const AddExpense = () => {
    const [loader,setLoader] = useState(false)

    const {register,handleSubmit} = useForm()

    const addData = async (data) => {
        setLoader(true)
        console.log(data);
        
        try {
             await service.createDoc(data.category,data.amount)
            setLoader(false)
        } catch (error) {
            console.log("error ::"+error);
        }
        
    };


    return (
        <>
            {loader ? <Spinner/>: <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
                <form onSubmit={handleSubmit(addData)} className="bg-white p-6 rounded-lg shadow-md">
                    <Input
                        // label="Expense Category"
                        placeholder="Enter category"
                        {...register("category", {required: "Category Is Required"})}
                    />
                    <Input
                        // label="Amount"
                        type="number"
                        placeholder="Enter amount"
                        {...register("amount", {required: "Amount Is Required" })}
                    />
                    <Button type="submit" className="bg-purple-800 text-white mt-4">
                        Add Expense
                    </Button>
                </form>
            </div>
            }
        
        </>
    );
};

export default AddExpense;
