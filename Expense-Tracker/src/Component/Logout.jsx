import React, { useEffect } from 'react';
import Button from './Button';
import authService from '../firebase/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logout as logoutStore } from '../store/expenseSlice';

const Logout = ({className}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = async () => {
        await authService.logout()
        dispatch(logoutStore())
        navigate('/login')
    }

    return (
        <div>
                <Button onClick={logout} className={`bg-amber-50 text-gray-600 cursor-pointer hover:opacity-80 ${className}`}>Logout</Button>
        </div>
    );
};

export default Logout;