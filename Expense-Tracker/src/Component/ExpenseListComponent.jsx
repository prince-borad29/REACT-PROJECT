import React , {useEffect , useCallback , useState}from "react";
import {ExpenseCard } from "./index";
import { useDispatch } from "react-redux";
import service from "../firebase/config";
import { useSelector } from "react-redux";
import {Spinner} from "./index";
import { setDoc, setBalance, setExpense, setIncome } from "../store/expenseSlice";

const ExpenseListComponent = () => {    

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)
    const uid = useSelector(state => state.expenseReducer.uid)
    const auth = useSelector(state => state.expenseReducer.isLoggedIn)
    
    const fetchData = useCallback(async () => {
        /* variables for balance , income and expense */
        var balance = 0 , income = 0 , expense = 0
        setLoader(true)

        const data = await service.getDoc(uid) || []
        // console.log(data);

        const dataDocs = [] 

        data.forEach((data) => {
            //calculating income , expense , balance
            data.data().expense_type === "Income" ?  income += parseInt(data.data().expense_amount) : expense += parseInt(data.data().expense_amount)

            let dataObj = { id : "" , data: {} }

            dataObj = { ...dataObj, id: data.id , data: { ...data.data(), expense_date: new Date(data.data().expense_date.seconds * 1000).toDateString() } }
            // console.log('dataObj=>' + JSON.stringify({...data.data(),expense_date:Date(data.expense_date)}));
            dataDocs.push(dataObj)

        })

        dispatch(setDoc(dataDocs))

        setLoader(false)

        dispatch(setIncome(income))
        dispatch(setExpense(expense))
        balance = income - expense
        dispatch(setBalance(balance))

    }, [])

    const change = useSelector(state => state.expenseReducer.change)

    useEffect(() => {
        auth && uid ? fetchData() : ""
    }, [change,uid])

    // var docs = useSelector(state => state.expenseReducer.data);
    var docs = useSelector(state => state.expenseReducer.data) || []

    return (
        <div className="p-4 rounded-lg">

            { console.log('docs :: '+docs)}
            {!loader ?

                docs?.map((doc,index) => {
                    // console.log(`ID : ${doc.id} => EXPENSE CATEGORY :: ${doc.data.expense_category} || EXPENSE AMOUNT :: ${doc.data.expense_amount}`);
                    // console.log(`index :: ${index} || data at index => ${doc.data.expense_category}`);

                    return <ExpenseCard key={index} expense={doc} />
                })
                : <Spinner/>
            }

        </div> 
    );
};

export default ExpenseListComponent;
