import React from 'react';
import { X } from 'lucide-react'; // Adjust the import if necessary

const AddMenuModal = ({
    newMenuName,
    setNewMenuName,
    setIsAddMenuOpen,
    handleAddMenu
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-black dark:text-white">Create Menu</h2>
                        <button
                            onClick={() => setIsAddMenuOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <form onSubmit={handleAddMenu}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium">
                                <span className="text-gray-700 dark:text-white">Name</span>
                                <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={newMenuName}
                                onChange={(e) => setNewMenuName(e.target.value)}
                                placeholder="Menu Name"
                                className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMenuModal;
