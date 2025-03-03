import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import service from '../firebase/config'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// console.log(COLORS);

const Reports = () => {

    
    const uid = useSelector(state => state.expenseReducer.uid)

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    function getRandomColorsArray(size) {
        return Array.from({ length: size }, getRandomColor);
    }

    const COLORS = getRandomColorsArray(100);

    const [data, setData] = useState([])

    const fetchData = async () => {

        

        const dataDoc = await service.getDoc(uid)

        dataDoc.forEach((dt) => {
            const doc = dt.data()
            if (doc.expense_type === "Expense") {
                setData((prev) => [...prev  ,{ name: doc.expense_category, value: doc.expense_amount }])
                // console.log(data);
                data.push({ name: doc.expense_category, value: doc.expense_amount })
            }
            // console.log(`cate : ${doc.expense_category} || Amount : ${doc.expense_amount} ||type : ${doc.expense_type}`);
        })
        
        // console.log(data);

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
            <div className="flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie data={data} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value">
                        {data.map((entry, index) => {
                            // console.log(entry)
                            return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        })}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Reports;
