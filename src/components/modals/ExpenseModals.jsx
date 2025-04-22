/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExpense, updateExpense } from "../../services/api";

const ExpenseModal = ({ onClose, onCreate, onEdit, expense }) => {
  const formik = useFormik({
    initialValues: {
      name: expense ? expense.name : "",
      description: expense ? expense.description : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (expense) {
          // Editing existing expense
          const response = await updateExpense(expense._id,values);
          if (response.status === 200) onEdit(response.data.data);
        } else {
          // Creating a new expense
          const response = await createExpense(values);
          if (response.status === 200) onCreate(response.data.data);
        }
      } catch (error) {
        console.error("Error saving expense:", error);
      }
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-500/30">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
        <h2 className="text-lg font-semibold mb-4">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <label className="block">Category</label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter category"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <label className="block mt-2">Description</label>
          <input
            type="text"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 border rounded mt-1"
            placeholder="Enter description"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
