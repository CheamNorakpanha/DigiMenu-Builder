import React from 'react';
import { MoreVertical } from 'lucide-react';

function DropdownToggleButton({ onClick, isActive }) {
    return (
        <button
            onClick={onClick}
            className="p-1 rounded-lg bg-white text-gray-800 dark:bg-black dark:text-gray-200"
        >
            <MoreVertical className={`h-5 w-5 ${isActive ? 'text-gray-800' : 'text-gray-500'}`} />
        </button>
    );
}

export default DropdownToggleButton;
