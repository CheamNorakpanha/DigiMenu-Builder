import { useRef } from 'react';
import { X, ImageIcon } from 'lucide-react';

export default function AddRestaurantModal({
    isOpen,
    onClose,
    newRestaurant,
    handleInputChange,
    handleSave,
    handleDragOver,
    handleDrop,
    handleImageUpload,
}) {
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add Restaurant</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newRestaurant.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A] focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#d3a1d9] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={newRestaurant.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A] focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#d3a1d9] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className="block text-sm font-medium mb-1">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={newRestaurant.contactNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A] focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#d3a1d9] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="border-2 border-dashed border-[#764ab3] rounded-lg p-8 text-center cursor-pointer dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {newRestaurant.coverImage ? (
                                <img src={newRestaurant.coverImage} alt="Restaurant cover" width={200} height={100} className="mx-auto" />
                            ) : (
                                <>
                                    <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] dark:text-[#d3a1d9] mb-4" />
                                    <p className="text-sm text-[#764ab3] dark:text-[#d3a1d9]">
                                        Drag a jpeg image here or click to select a jpeg image file
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/jpeg"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="w-full py-2 px-4 rounded-md bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
