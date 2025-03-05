const Footer = () => {
    return (
        <footer className="z-50 fixed bottom-0 left-0 right-0 w-full dark:bg-gray-900 dark:text-gray-300 text-black bg-white text-center p-4 mt-8">
            <p className="text-sm">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        </footer>
    );
};

export default Footer;