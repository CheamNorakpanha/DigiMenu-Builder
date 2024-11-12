import React from 'react';
import { X } from 'lucide-react';

interface EditRestaurantModalProps {
    isOpen: boolean;
    editingRestaurant: {
        name: string;
        location: string;
        contactNumber: string;
        coverImage?: string;
    };
    setIsEditModalOpen: (open: boolean) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => void;
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: React.DragEvent<HTMLDivElement>, isEditing: boolean) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean) => void;
    handleUpdate: () => void;
    editFileInputRef: React.RefObject<HTMLInputElement>;
}

export default function EditRestaurantModal({
    isOpen,
    editingRestaurant,
    setIsEditModalOpen,
    handleInputChange,
    handleDragOver,
    handleDrop,
    handleImageUpload,
    handleUpdate,
    editFileInputRef,
}: EditRestaurantModalProps) {
    if (!isOpen || !editingRestaurant) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Edit Restaurant</h2>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            id="edit-name"
                            name="name"
                            value={editingRestaurant.name}
                            onChange={(e) => handleInputChange(e, true)}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-location" className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            id="edit-location"
                            name="location"
                            value={editingRestaurant.location}
                            onChange={(e) => handleInputChange(e, true)}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                        />
                    </div>
                    <div>
                        <label htmlFor="edit-contactNumber" className="block text-sm font-medium mb-1">Contact Number</label>
                        <input
                            type="tel"
                            id="edit-contactNumber"
                            name="contactNumber"
                            value={editingRestaurant.contactNumber}
                            onChange={(e) => handleInputChange(e, true)}
                            className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, true)}
                            className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                            onClick={() => editFileInputRef.current?.click()}
                        >
                            {editingRestaurant.coverImage ? (
                                <img src={editingRestaurant.coverImage} alt="Restaurant cover" width={200} height={100} className="mx-auto" />
                            ) : (
                                <p>Drag a JPEG image here or click to select a JPEG image file</p>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={editFileInputRef}
                            accept="image/jpeg"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e, true)}
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="w-full py-2 px-4 rounded-md bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}
