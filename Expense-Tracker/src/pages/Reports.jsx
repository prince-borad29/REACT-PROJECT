import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
    { name: "Food", value: 200 },
    { name: "Transport", value: 50 },
    { name: "Shopping", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Reports = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
            <div className="flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Reports;
