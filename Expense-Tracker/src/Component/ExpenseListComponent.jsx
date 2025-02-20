import React , {useEffect , useCallback , useState}from "react";
import {ExpenseCard } from "./index";
import { useDispatch } from "react-redux";
import service from "../firebase/config";
import { useSelector } from "react-redux";
import { setDoc } from "../store/expenseSlice";
import {Spinner} from "./index";
import { data } from "react-router";

const ExpenseListComponent = () => {    

    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true)

    const fetchData = useCallback(async () => {
        setLoader(true)
        const data = await service.getDoc()

        const dataDocs = []
        data.forEach((data) => {
            let dataObj = { id: "", data: {} }
            dataObj = { ...dataObj, id: data.id, data: data.data() }
            dataDocs.push(dataObj)
        })
        dispatch(setDoc(dataDocs))
        setLoader(false)
    }, [dispatch])
    
    useEffect(() => {
        fetchData()
    }, [])

     const docs = useSelector(state => state.expenseReducer.data);


    return (
        <div className="p-4 bg-gray-100 rounded-lg">

            {!loader ?
                // console.log('docs :: '+docs)

                docs.map((doc,index) => {
                    // console.log(`ID : ${doc.id} => EXPENSE CATEGORY :: ${doc.data.expense_category} || EXPENSE AMOUNT :: ${doc.data.expense_amount}`);
                    // console.log(`index :: ${index} || data at index => ${doc.data.expense_category}`);

                    return <ExpenseCard key={index} expense={doc} />
                })
                : <Spinner />
            }

        </div> 
    );
};

export default ExpenseListComponent;
