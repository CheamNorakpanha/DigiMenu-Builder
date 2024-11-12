import { PlusCircle, Edit, Trash } from 'lucide-react';
import DropdownToggleButton from './DropdownToggleButton';
import { Link } from 'react-router-dom';

function MyRestaurants({ restaurants, setIsModalOpen, activeDropdown, setActiveDropdown, handleEdit, handleDelete, dropdownRef }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Restaurants</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent dark:bg-transparent text-black dark:text-white px-4 py-2 rounded-md transition-colors flex items-center border border-gray-400 dark:border-[#947198]"
                >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add new restaurant
                </button>
            </div>
            <p className="text-gray-600 mb-8 dark:text-[#947198]">
                Start creating a new digital menu by adding a new restaurant.
            </p>
            <div className="transition-colors grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden relative border border-gray-500 dark:border-[#947198]" key={restaurant.id}>
                        {/* Link wrapper for navigating to restaurant dashboard */}
                        <Link to={`/restaurant/dashboard-new-york-beef-burger`} className="block">
                            <img
                                src={restaurant.coverImage}
                                alt={`${restaurant.name} cover`}
                                width={400}
                                height={200}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-1">{restaurant.location}</p>
                            </div>
                        </Link>

                        {/* Dropdown button and menu */}
                        <div className="absolute top-2 right-2">
                            <DropdownToggleButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveDropdown(activeDropdown === restaurant.id ? null : restaurant.id);
                                }}
                                isActive={activeDropdown === restaurant.id}
                            />
                            {activeDropdown === restaurant.id && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-1 bg-white dark:bg-black border border-gray-400 dark:border-[#947198]"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop propagation to avoid Link navigation
                                            handleEdit(restaurant.id);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-600 dark:text-[#d3a1d9] hover:bg-red-100 dark:hover:bg-fuchsia-300/25"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Stop propagation to avoid Link navigation
                                            handleDelete(restaurant.id);
                                        }}
                                        className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                                    >
                                        <Trash className="mr-2 h-4 w-4 text-red-500 dark:text-red-600" />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyRestaurants;
