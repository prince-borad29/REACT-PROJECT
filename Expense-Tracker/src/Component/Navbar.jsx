import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icon library
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()

    return (
        <nav className="bg-white text-black p-4 border-gray shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    ExpenseTracker
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <Link to="/" className={` hover:text-gray-300 ${location.pathname == '/' ? "text-black" : "text-gray-500"} `}>Home</Link>
                    </li>
                    <li>
                        <Link to="/add-expense" className={` hover:text-gray-300 ${location.pathname == '/add-expense' ? "text-black" : "text-gray-500"} `}>Add Expense</Link>
                    </li>
                    <li>
                        <Link to="/reports" className={` hover:text-gray-300 ${location.pathname == '/reports' ? "text-black" : "text-gray-500"} `}>Reports</Link>
                    </li>
                    <li>
                        <Link to="/settings" className={` hover:text-gray-300 ${location.pathname == '/settings' ? "text-black" : "text-gray-500"} `}>Settings</Link>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-white p-4 ">
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
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
