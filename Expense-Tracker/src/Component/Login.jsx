import React, { useEffect, useState } from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login as loginStore } from "../store/expenseSlice";
import { Link, useNavigate } from "react-router-dom"; // Fixed import

const Login = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

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
            } else {
                setError("Username or Password Doesn't Match");
            }
        } catch (error) {
            setError("Username or Password Doesn't Match");
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Sign in
                </h2>

                <form onSubmit={handleSubmit(login)} className="mt-5 space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
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

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <div className="mt-2">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                                {...register("pwd", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <div>
                        <Button
                            type="submit"
                            className="w-full px-5 py-3 rounded-lg bg-indigo-600 text-white text-base font-semibold shadow-md hover:bg-indigo-500 transition focus:ring-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </Button>
                        <div className="text-red-600 mt-2 text-center">{error && error}</div>
                    </div>
                </form>

                {/* Signup Link */}
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
