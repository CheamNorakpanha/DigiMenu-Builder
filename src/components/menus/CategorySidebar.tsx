import { MoreVertical, Plus, Edit, Trash } from 'lucide-react';

const CategorySidebar = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    handleEditCategory,
    handleDeleteCategory,
    setIsAddMenuOpen,
    openCategoryMenu,
    setOpenCategoryMenu
}) => {
    return (
        <div className="w-64 flex-shrink-0">
            <div className="space-y-2">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`w-full flex items-center justify-between p-4 rounded-lg text-left border ${selectedCategory === category.id
                            ? 'bg-[#764ab3]/20 text-[#764ab3] border-[#764ab3] dark:bg-[#d3a1d9] dark:text-white dark:border-[#d3a1d9]'
                            : 'bg-gray-50 hover:bg-gray-200 border-gray-200 dark:bg-transparent dark:text-[#947198] dark:border-[#947198]'
                            }`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <div className="flex items-center">
                            <span className="text-lg">{category.name}</span>
                        </div>
                        <div className="relative category-menu">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenCategoryMenu(openCategoryMenu === category.id ? null : category.id);
                                }}
                                className="p-1 rounded-full"
                            >
                                <MoreVertical className="h-5 w-5 text-gray-400 dark:text-white" />
                            </button>
                            {openCategoryMenu === category.id && (
                                <div className="absolute right-0 mt-2 w-48 p-1 rounded-lg shadow-lg z-10 bg-white dark:bg-black border border-gray-400 dark:border-[#947198]">
                                    <div className="py-1">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-600 dark:text-[#d3a1d9] hover:bg-red-100 dark:hover:bg-fuchsia-300/25"
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category)}
                                            className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                                        >
                                            <Trash className="mr-2 h-4 w-4 text-red-500 dark:text-red-600" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => setIsAddMenuOpen(true)}
                className="w-full p-4 mt-2 text-[#764ab3] dark:text-[#947198] bg-transparent dark:bg-transparent rounded-lg flex items-center justify-center hover:bg-[#764ab3]/20 dark:hover:bg-[#947198]/20"
            >
                <Plus className="h-5 w-5 mr-2" />
                Add Menu
            </button>
        </div>
    );
};

export default CategorySidebar;
