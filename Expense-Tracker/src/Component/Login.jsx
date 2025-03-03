import React, { useEffect, useState } from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login as loginStore} from "../store/expenseSlice";
import { Link, useNavigate } from "react-router";


const Login = () => {

    const {register,handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const [error,setError] = useState("")


    const login = async (data) => {

        try {
            const user = await authService.login(data.email, data.pwd);
            if (user) {
                authService.getCurrentUser().then((userData) => {
                    if (userData) {
                        dispatch(loginStore({ id: userData.id, email: userData.email }));
                        navigate("/");
                    }
                });
            }
            else{
                setError(() => "Username or Password Doesn't Match")
            }
        } catch (error) {
            setError("Username or Password Doesn't Match")
            console.error(() => "Login failed:", error);
        }
        

    }

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 mt-0 shadow-lg rounded-lg p-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>

                <form onSubmit={handleSubmit(login)} className="mt-5 space-y-6">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("email",{required : true})}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            
                            {/* <Link to="/forgotpassword" className="font-semibold text-blue-600 hover:text-indigo-500">Forgot password?</Link> */}
                        </div>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("pwd",{required:true})}
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <Button
                            type="submit"
                            className="cursor-pointer flex w-full justify-center rounded-lg bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-indigo-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Sign in
                        </Button>
                        <div className="text-red-600 m-2">
                            {error !== "" && error}
                        </div>
                    </div>

                    {/* Divider
                    <div className="relative flex items-center justify-center">
                        <span className="absolute bg-white dark:bg-gray-800 px-4 text-gray-500">
                            or
                        </span>
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div> */}

                    {/* Sign in with Google */}
                    {/* <div>
                        <button
                            className="cursor-pointer flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-300 dark:border-gray-600 px-5 py-3 text-base font-semibold text-gray-700 dark:text-white shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
                        >
                            <FcGoogle className="h-6 w-6 "/>
                            <span>Sign in with Google</span>
                        </button>
                    </div> */}
                </form>

                {/* Signup Link */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-indigo-500">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;