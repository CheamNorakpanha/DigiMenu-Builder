import React from 'react';
import { X } from 'lucide-react'; // Make sure to import or adjust the path to the X icon component

const DeleteCategoryModal = ({
    deletingCategory,
    setIsDeleteCategoryOpen,
    setDeletingCategory,
    confirmDeleteCategory,
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                            Delete {deletingCategory?.name} category
                        </h2>
                        <button
                            onClick={() => {
                                setIsDeleteCategoryOpen(false);
                                setDeletingCategory(null);
                            }}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="text-gray-600 dark:text-white mb-6">
                        Are you sure you want to delete this category? This action cannot be undone and will delete all items in this category.
                    </p>
                    <div className="flex justify-end">
                        <button
                            onClick={confirmDeleteCategory}
                            className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;
