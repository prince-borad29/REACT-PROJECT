import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import service from '../firebase/config'
import { Input, Button ,Spinner, RadioButtonGroup} from '../Component'
import { changeInDoc } from '../store/expenseSlice'
import { useDispatch } from 'react-redux'

export default function UpdateExpense({ expense, open ,id}) {

    const [loader, setLoader] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(open)
    // console.log(isModalOpen);

    const { register, handleSubmit , setValue , control , getValues} = useForm({
        defaultValues: {
            category: expense?.expense_category || '',
            amount: expense?.expense_amount || '',
            date: new Date(expense?.expense_date).toLocaleDateString("en-CA") || '',
            type : expense?.expense_type || ''
        }
    })

    // console.log(date);
    
    useEffect(() => {
        setValue("expense_date",Date.now())
    },[])

    const dispatch = useDispatch()

    const updateData = async (data) => {
        
        try {
            setLoader(true)
            await service.updateDoc(id, data.category, data.amount , data.date,data.type)
            setIsModalOpen(false)
            dispatch(changeInDoc())
            setLoader(false)
        } catch (error) {
            console.log("error ::" + error);
        }
    };

    return (
        
        <>

            {/* {
                console.log(typeof date)
            } */}

            {loader ? <Spinner /> :

                <Dialog open={isModalOpen} onClose={() => !open} className="relative z-10">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                            >
                                <div className="bg-gray-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <DialogTitle as="h3" className="dark:text-white text-base font-semibold text-gray-900">
                                                Update Expense
                                            </DialogTitle>
                                            <div className="mt-2 ">
                                                <form onSubmit={handleSubmit(updateData)} >
                                                    <Input
                                                        // label="Expense Category"
                                                        placeholder="Enter category"
                                                        {...register("category", { required: "Category Is Required" })}
                                                    />
                                                    <RadioButtonGroup name="type" control={control} defaultValues={getValues("type")}/>
                                                    <Input
                                                        // label="Amount"
                                                        type="number"
                                                        placeholder="Enter amount"
                                                        {...register("amount", { required: "Amount Is Required" })}
                                                    />
                                                    <Input
                                                        type="date"
                                                        {...register("date", { required: "Date Is Required"})}
                                                    />

                                                    <div className="dark:bg-gray-600 bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <Button type="submit" className="bg-purple-800 text-white mt-4 hover:opacity-80 cursor-pointer">
                                                            Update Expense
                                                        </Button>
                                                        <Button type="button"
                                                            className="bg-stone-800 text-white mr-4 mt-4 hover:opacity-80 cursor-pointer"
                                                            onClick={() => setIsModalOpen(false)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            }
        </>
    )
}
