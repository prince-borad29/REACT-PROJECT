import { Controller } from "react-hook-form";

const RadioButtonGroup = ({ control, name }) => {
    // const { field } = useController({ name, control });

    return (
        <Controller 
        name={name}
        control={control}
        render={({field : {onChange , value} }) => (
            <div className="flex space-x-4 mt-2 mb-2">
                <label className="flex items-center space-x-2 cursor-pointer dark:text-white">
                    <input
                        type="radio"
                        value="Income"
                        checked={value === "Income"}
                        onChange={onChange}
                        className="hidden"
                    />
                    <div
                        className={`w-5 h-5  rounded-full border-2 flex items-center justify-center transition-colors ${value === "Income" ? "bg-blue-500 border-blue-500" : "border-gray-400"
                            }`}
                    >
                        {value === "Income" && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <span className="dark:text-white text-gray-700">Income</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        value="Expense"
                        checked={value === "Expense"}
                        onChange={onChange}
                        className="hidden"
                    />
                    <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${value === "Expense" ? "bg-red-500 border-red-500" : "border-gray-400"
                            }`}
                    >
                        {value === "Expense" && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <span className="dark:text-white text-gray-700">Expense</span>
                </label>
            </div>
        )}
        />
    );
};

export default RadioButtonGroup;
