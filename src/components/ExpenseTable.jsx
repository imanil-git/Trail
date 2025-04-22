import { useEffect, useState } from "react";
import ExpenseModal from "./modals/ExpenseModals";
import DeleteModel from "./modals/DeleteModals";
import { createExpense, deleteExpense, getExpenses } from "../services/api";

const ExpenseTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [deletingExpense, setDeletingExpense] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);


  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleCreate = async (newExpense) => {
    try {
      const response = await createExpense(newExpense);

      if (response.status === 200) {
        await fetchExpenses();
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleEdit = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((exp) =>
        exp._id === updatedExpense._id ? updatedExpense : exp
      )
    );
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      if (!deletingExpense) return;

      await deleteExpense(deletingExpense);

      setExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp._id !== deletingExpense)
      );

      setDeleteModal(false);
      setDeletingExpense(null);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded shadow-md">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Expense Categories</h2>

          <button
            onClick={() => {
              setEditingExpense(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            + Add Expense
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">S.N</th>
              <th className="px-4 py-2 border">Category Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={exp._id} className="border">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{exp.name}</td>
                <td className="px-4 py-2">{exp.description || "-"}</td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditingExpense(exp);
                      setIsModalOpen(true);
                    }}
                    className="bg-slate-500 text-white p-2 rounded-lg"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => {
                      setDeletingExpense(exp._id);
                      setDeleteModal(true);
                    }}
                    className="bg-red-500 text-white p-2 rounded-lg"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <ExpenseModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
          onEdit={handleEdit}
          expense={editingExpense}
        />
      )}
      {deleteModal && (
        <DeleteModel
          onClose={() => setDeleteModal(false)}
          onDelete={handleDelete}
          expense={editingExpense}
        />
      )}
    </div>
  );
};

export default ExpenseTable;
