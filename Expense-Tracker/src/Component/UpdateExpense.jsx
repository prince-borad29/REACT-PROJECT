import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import service from '../firebase/config';
import { Input, Button, Spinner, RadioButtonGroup } from '../Component';
import { changeInDoc } from '../store/expenseSlice';
import { useDispatch } from 'react-redux';

export default function UpdateExpense({ expense, id, isModalOpen, setIsModalOpen }) {
    const [loader, setLoader] = useState(false);

    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            category: expense?.expense_category || '',
            amount: expense?.expense_amount || '',
            date: new Date(expense?.expense_date).toLocaleDateString("en-CA") || '',
            type: expense?.expense_type || ''
        }
    });

    useEffect(() => {
        setValue("date", new Date(expense?.expense_date).toISOString().split("T")[0]); // Format date properly
    }, [expense, setValue]);

    const dispatch = useDispatch();

    const updateData = async (data) => {
        try {
            setLoader(true);
            await service.updateDoc(id, data.category, data.amount, data.date, data.type);
            dispatch(changeInDoc());
            setLoader(false);
            setIsModalOpen(false); // Close modal after update
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            {loader ? <Spinner /> : (
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
                    <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
                    <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                        <DialogPanel className="w-full max-w-lg bg-white rounded-lg shadow-xl transform transition-all sm:my-8">
                            <div className="border-none rounded-lg dark:bg-gray-600 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <DialogTitle as="h3" className="dark:text-white text-base font-semibold text-gray-900">
                                            Update Expense
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(updateData)}>
                                                <Input
                                                    placeholder="Enter category"
                                                    {...register("category", { required: "Category is required" })}
                                                />
                                                <RadioButtonGroup name="type" control={control} defaultValues={getValues("type")} />
                                                <Input
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    {...register("amount", { required: "Amount is required" })}
                                                />
                                                <Input
                                                    type="date"
                                                    {...register("date", { required: "Date is required" })}
                                                />

                                                <div className="dark:bg-gray-600 bg-gray-50 px-4 py-3 flex flex-col-reverse sm:flex-row sm:justify-end sm:px-6 gap-3 sm:gap-4">
                                                    <Button
                                                        type="button"
                                                        className="bg-stone-800 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:opacity-80 cursor-pointer"
                                                        onClick={() => setIsModalOpen(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        className="bg-purple-800 text-white w-full sm:w-auto px-4 py-2 rounded-md hover:opacity-80 cursor-pointer"
                                                    >
                                                        Update
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}
        </>
    );
}
