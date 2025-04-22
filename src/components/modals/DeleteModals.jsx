/* eslint-disable react/prop-types */

const DeleteModel = ({ onClose, onDelete }) => {

    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-gray-500/30">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">
            Are you sure you want to delete?
          </h2>
  
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded mr-2"
            >
              No
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModel;
