import React, { useRef } from "react";
import { MoreVertical, Trash } from "lucide-react";

export default function BannerCard({
    banner,
    openMenuId,
    toggleMenu,
    openDeleteModal,
}) {
    const menuRef = useRef(null);

    return (
        <div
            key={banner.id}
            className="relative shadow-lg rounded-lg bg-white dark:bg-gray-800 w-500 min-h-[200px] flex flex-col overflow-hidden"
        >
            <div className="w-full h-full">
                <img
                    src={banner.image}
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="absolute top-2 right-2" ref={menuRef}>
                <button
                    className="p-1 rounded-lg bg-white text-gray-800 dark:bg-black dark:text-gray-200"
                    onClick={(e) => toggleMenu(banner.id, e)}
                >
                    <MoreVertical className="h-5 w-5 text-white" />
                </button>
                {openMenuId === banner.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-1 bg-white dark:bg-black border border-gray-400 dark:border-[#947198]">
                        <button
                            className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                            onClick={() => openDeleteModal(banner)}
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}