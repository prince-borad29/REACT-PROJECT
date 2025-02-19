import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpensePage";
import Reports from "./pages/Reports";
import Setting from "./pages/Setting";
import Navbar from "./Component/Navbar"; // Add a Navbar component

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
