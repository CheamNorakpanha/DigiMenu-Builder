import { X, ImageIcon } from 'lucide-react'; // Replace with your actual import

const AddMenuItemModal = ({
    newItem,
    setNewItem,
    handleAddItem,
    setIsAddItemOpen,
    fileInputRef,
    handleImageDrop,
    handleImageChange
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-black dark:text-white">Create Menu Item</h2>
                        <button
                            onClick={() => setIsAddItemOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <form onSubmit={handleAddItem}>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                <span className="text-gray-700 dark:text-white">Name</span>
                                <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                placeholder="Item Name"
                                className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                <span className="text-gray-700 dark:text-white">Price</span>
                                <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                placeholder="$10.00"
                                className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">
                                <span className="text-gray-700 dark:text-white">Description</span>
                            </label>
                            <textarea
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                rows={4}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium">
                                <span className="text-gray-700 dark:text-white">Image</span>
                            </label>
                            <div
                                onClick={() => fileInputRef.current.click()}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleImageDrop(e)}
                                className="border-2 border-dashed border-[#764ab3] dark:border-[#947198] rounded-lg p-8 text-center cursor-pointer"
                            >
                                {newItem.image ? (
                                    <img src={newItem.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                ) : (
                                    <>
                                        <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] dark:text-[#947198] mb-4" />
                                        <p className="text-sm text-[#764ab3] dark:text-[#947198]">
                                            Drag an image here or click to select an image file
                                        </p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e)}
                                    className="hidden"
                                />
                            </div>
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

export default AddMenuItemModal;