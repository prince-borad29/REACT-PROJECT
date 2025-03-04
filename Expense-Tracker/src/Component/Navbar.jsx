import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library
import { useLocation } from "react-router-dom";
import DarkTheme from "./DarkTheme";
import Logout from "./Logout";
import Avtar from "./Avtar";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()

    return (
        <nav className="dark:bg-gray-800 dark:text-white text-black p-4 border-gray shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    ExpenseTracker
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li className="mt-2">
                        <Link to="/" className={`hover:text-gray-300 ${location.pathname == '/' ? "text-white" : "text-gray-500"}`}>Home</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/add-expense" className={`hover:text-gray-300 ${location.pathname == '/add-expense' ? "text-white" : "text-gray-500"}`}>Add Expense</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/reports" className={`hover:text-gray-300 ${location.pathname == '/reports' ? "text-white" : "text-gray-500"}`}>Reports</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/settings" className={`hover:text-gray-300 ${location.pathname == '/settings' ? "text-white" : "text-gray-500"}`}>Settings</Link>
                    </li>
                    <li>
                        <Logout />
                    </li>
                    <li className="mt-2">
                        <DarkTheme />
                    </li>
                    <li>
                        <Avtar />
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="z-50 fixed top-0 left-0 w-full h-auto bg-white dark:bg-gray-600 dark:text-white p-4 shadow-lg rounded-md md:hidden flex flex-col">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Menu</span>
                        <button onClick={() => setIsOpen(false)}>
                            <X size={28} />
                        </button>
                    </div>
                    <ul className="flex flex-col mt-4 space-y-2 flex-1 overflow-auto">
                        <li>
                            <Link to="/" className="block py-2 hover:text-purple-600" onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/add-expense" className="block py-2 hover:text-purple-600" onClick={() => setIsOpen(false)}>Add Expense</Link>
                        </li>
                        <li>
                            <Link to="/reports" className="block py-2 hover:text-purple-600" onClick={() => setIsOpen(false)}>Reports</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="block py-2 hover:text-purple-600" onClick={() => setIsOpen(false)}>Settings</Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                        <li>
                            <DarkTheme />
                        </li>
                        <li>
                            <Avtar />
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
