
import { useState } from "react";
import ExpenseModal from "./ExpenseModal";

const ExpenseTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Food", description: "Lunch", amount: "$20" },
    { id: 2, category: "Transport", description: "Taxi fare", amount: "$10" },
  ]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }]);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          + Add Expense
        </button>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id} className="border">
                <td className="px-4 py-2">{exp.category}</td>
                <td className="px-4 py-2">{exp.description}</td>
                <td className="px-4 py-2">{exp.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ExpenseModal onClose={() => setIsModalOpen(false)} onSave={addExpense} />}
    </div>
  );
};

export default ExpenseTable;
