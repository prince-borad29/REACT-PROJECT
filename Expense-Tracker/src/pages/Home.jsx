import { SummaryCard, ExpenseListComponent, } from "../Component/index"
import { useSelector } from 'react-redux'

const Home = () => {

    const balance = useSelector(state => state.expenseReducer.balance)
    const income = useSelector(state => state.expenseReducer.income)
    const expense = useSelector(state => state.expenseReducer.expense)

return (
    <div className="dark:bg-gray-800 dark:text-white text-2xl font-bold mb-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Summary Cards */}
        <div className="dark:bg-gray-800 dark:text-white grid grid-cols-3 gap-4 mb-6">
            <SummaryCard title="Balance" amount={balance} color="bg-white" className="dark:bg-gray-600 dark:text-white"/>
            <SummaryCard title="Income" amount={income} color="bg-white" className="text-green-600 dark:bg-gray-600 dark:text-green-400" />
            <SummaryCard title="Expenses" amount={expense} color="bg-white" className="text-red-600 dark:bg-gray-600 dark:text-red-400" />
        </div>

        {/* Expense List */}
        <h2 className="text-xl font-semibold mb-2 dark:bg-gray-800 dark:text-white">Recent Expenses</h2>
        <ExpenseListComponent />
    </div>
);
};

export default Home;
