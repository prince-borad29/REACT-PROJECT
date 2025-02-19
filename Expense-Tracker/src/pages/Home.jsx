import { SummaryCard, ExpenseListComponent } from "../Component/index"

const Home = () => {
    const expenses = [
        { category: "Food", date: "2025-02-18", amount: 200 },
        { category: "Transport", date: "2025-02-17", amount: 50 },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <SummaryCard title="Balance" amount="1200" color="bg-white"/>
                <SummaryCard title="Income" amount="2000" color="bg-white" className="text-green-600"/>
                <SummaryCard title="Expenses" amount="800" color="bg-white" className="text-red-600"/>
            </div>

            {/* Expense List */}
            <h2 className="text-xl font-semibold mb-2">Recent Expenses</h2>
            <ExpenseListComponent expenses={expenses} />
        </div>
    );
};

export default Home;
