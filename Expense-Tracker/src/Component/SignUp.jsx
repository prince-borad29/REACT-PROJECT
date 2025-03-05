import React, { useState } from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login as loginStore} from "../store/expenseSlice";
import { Link, useNavigate } from "react-router";

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signUp = async (data) => {
        if (data.pwd === data.confirmPwd) {
            if (data.pwd.length >= 6) {
                const user = await authService.createAccount(data.email, data.pwd);
                if (user) {
                    const authorized = await authService.login(data.email, data.pwd);

                    if(authorized){                        
                        dispatch(loginStore({id : authorized.uid , email : authorized.email }));
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);}
                }
            } else {
                setError(() => "Password Must Be At Least 6 Characters");
            }
        } else {
            setError(() => "Password Doesn't Match");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Create an account
                </h2>

                <form onSubmit={handleSubmit(signUp)} className="mt-5 space-y-6">
                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("email", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Enter a strong password"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("pwd", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Re-enter your password"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("confirmPwd", { required: true })}
                            />
                        </div>
                    </div>

                    {/* SignUp Button */}
                    <div>
                        <Button
                            type="submit"
                            className="flex w-full justify-center rounded-lg bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Sign Up
                        </Button>
                        <div className="text-red-600 mt-2 text-center">
                            {error !== "" && error}
                        </div>
                    </div>

                    {/* Divider */}
                    {/* <div className="relative flex items-center justify-center">
                        <span className="absolute bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-400">or</span>
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div> */}

                    {/* Sign up with Google */}
                    {/* <div>
                        <button
                            className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 px-5 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            <span>Sign up with Google</span>
                        </button>
                    </div> */}
                </form>

                {/* Already have an account? */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-indigo-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
