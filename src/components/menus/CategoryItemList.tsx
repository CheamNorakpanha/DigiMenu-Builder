import { ChevronDown, Plus, Pencil, Trash } from 'lucide-react';

const CategoryItemList = ({
    categories,
    selectedCategory,
    handleEditItem,
    handleDeleteItem,
    setIsAddItemOpen
}) => {
    const category = categories.find(c => c.id === selectedCategory);

    return (
        <div className="flex-1">
            <div className="bg-gray-300 dark:bg-fuchsia-300 bg-opacity-10 dark:bg-opacity-10 rounded-lg p-6 border border-gray-200 dark:border-[#947198]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        {category?.name}
                    </h2>
                    <button className="p-2 rounded-lg">
                        <ChevronDown className="h-5 w-5 text-gray-400 dark:text-white" />
                    </button>
                </div>

                <div className="space-y-4">
                    {category?.items.map(item => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between py-4 border-b last:border-0 border-gray-200 dark:border-[#947198]"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-transparent rounded-lg flex items-center justify-center border dark:border-[#947198]/30">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-cover" />
                                    ) : (
                                        <span className="text-xs text-gray-500 dark:text-[#947198]/30">No Image</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-medium text-black dark:text-white">{item.name}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-lg text-black dark:text-white">$ {item.price}</span>
                                <button
                                    onClick={() => handleEditItem(item)}
                                    className="p-2 rounded-lg"
                                >
                                    <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-300" />
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item)}
                                    className="p-2 rounded-lg"
                                >
                                    <Trash className="h-4 w-4 text-red-400 hover:text-red-600 dark:text-[#d3a1d9] dark:hover:text-fuchsia-300" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setIsAddItemOpen(true)}
                    className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default CategoryItemList;
