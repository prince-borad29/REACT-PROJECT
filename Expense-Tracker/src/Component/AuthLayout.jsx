import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../firebase/auth';

export default function Protected({ children, authentication = true }) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.expenseReducer.isLoggedIn)

    // authService.getCurrentUser()
    // .then((user) => {
    //     if(user){
    //         authentication = true
    //         console.log("AL FOUND USER");
            
    //     }
    // })

    useEffect(() => {
        console.log("IN UseEffect OF AuthLayout");
        
        if (authStatus === null || undefined) console.log("auth is undefined");

        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
};