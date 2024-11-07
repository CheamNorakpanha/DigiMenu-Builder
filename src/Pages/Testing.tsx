import { useState, useEffect, useRef } from 'react'
import { PlusCircle, X, MoreVertical, Edit, Trash } from 'lucide-react'
import Header from '../components/dashboard/Header'
import { Link } from 'react-router-dom'
import { allRestaurants } from '../components/dashboard/ExploreRestaurantConfig'

type Restaurant = {
    id: string
    name: string
    location: string
    contactNumber: string
    coverImage: string
}

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'myRestaurants' | 'explore'>('myRestaurants')
    const [darkMode, setDarkMode] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [newRestaurant, setNewRestaurant] = useState<Omit<Restaurant, 'id'>>({
        name: 'New York Beef Burger (Tonle Basak)',
        location: 'St. 308, Sangkat Tonle Bassac, Khan Chamkar Mon, Phnom Penh',
        contactNumber: '1234567890',
        coverImage: 'https://img.freepik.com/free-photo/street-food-still-life_23-2151535299.jpg?t=st=1730601966~exp=1730605566~hmac=fc0f6c9f9e53b3e36b1f93e7c577fc1117b0620fa16d8dcf23f87723ca4840be&w=1380'
    })

    const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null)
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false); // Set dark mode if the user prefers it
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
        const { name, value } = e.target
        if (isEditing && editingRestaurant) {
            setEditingRestaurant({ ...editingRestaurant, [name]: value })
        } else {
            setNewRestaurant(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (isEditing && editingRestaurant) {
                    setEditingRestaurant({ ...editingRestaurant, coverImage: reader.result as string })
                } else {
                    setNewRestaurant(prev => ({ ...prev, coverImage: reader.result as string }))
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, isEditing: boolean = false) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/jpeg')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (isEditing && editingRestaurant) {
                    setEditingRestaurant({ ...editingRestaurant, coverImage: reader.result as string })
                } else {
                    setNewRestaurant(prev => ({ ...prev, coverImage: reader.result as string }))
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSave = () => {
        if (newRestaurant.name && newRestaurant.location && newRestaurant.contactNumber && newRestaurant.coverImage) {
            const newRestaurantWithId = { ...newRestaurant, id: Date.now().toString() }
            setRestaurants(prev => [...prev, newRestaurantWithId])
            setNewRestaurant({ name: '', location: '', contactNumber: '', coverImage: '' })
            setIsModalOpen(false)
        }
    }

    const handleEdit = (id: string) => {
        const restaurantToEdit = restaurants.find(restaurant => restaurant.id === id)
        if (restaurantToEdit) {
            setEditingRestaurant(restaurantToEdit)
            setIsEditModalOpen(true)
        }
        setActiveDropdown(null)
    }

    const handleUpdate = () => {
        if (editingRestaurant) {
            setRestaurants(prev => prev.map(restaurant =>
                restaurant.id === editingRestaurant.id ? editingRestaurant : restaurant
            ))
            setEditingRestaurant(null)
            setIsEditModalOpen(false)
        }
    }

    const handleDelete = (id: string) => {
        setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id))
        setActiveDropdown(null)
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`first-line:flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors`}>
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <main className="flex-grow container mx-auto px-6 py-8">
                    {activeTab === 'myRestaurants' ? (
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
                                    <div key={restaurant.id} className={`bg-white dark:bg-black rounded-lg shadow-md overflow-hidden relative border border-gray-500 dark:border-[#947198]`}>
                                        <img
                                            src={restaurant.coverImage}
                                            alt={`${restaurant.name} cover`}
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                                            <p className={`text-gray-600 dark:text-gray-300  mb-1`}>{restaurant.location}</p>
                                            {/* <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{restaurant.contactNumber}</p> */}
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === restaurant.id ? null : restaurant.id)}
                                                className={`p-1 rounded-lg bg-white text-gray-800 dark:bg-black dark:text-gray-200`}
                                            >
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                            {activeDropdown === restaurant.id && (
                                                <div
                                                    ref={dropdownRef}
                                                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg p-1 bg-white dark:bg-black border border-gray-400 dark:border-[#947198]`}
                                                >
                                                    <button
                                                        onClick={() => handleEdit(restaurant.id)}
                                                        className={`flex items-center w-full px-4 py-2 text-sm rounded text-gray-600 dark:text-[#d3a1d9] hover:bg-red-100 dark:hover:bg-fuchsia-300/25`}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(restaurant.id)}
                                                        className={`flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50`}
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
                    ) : (
                        <div className='mb-20'>
                            <h1 className="text-3xl font-bold mb-4">Explore Restaurants</h1>
                            <p className="text-gray-600 dark:text-[#947198] mb-8 ">
                                Following are the restaurants published by all users.
                            </p>
                            {/* Add explore restaurants content here */}
                            <div className="transition-colors grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allRestaurants.map((restaurant) => (
                                    <div key={restaurant.Eid} className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-500 dark:border-[#947198]">
                                        <img
                                            src={restaurant.EcoverImage}
                                            alt={`${restaurant.Ename} cover`}
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2">{restaurant.Ename}</h2>
                                            <p className="text-gray-600 dark:text-gray-400">{restaurant.Eaddress}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className={`bg-white dark:bg-black rounded-lg p-6 w-full max-w-md`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Add Restaurant</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
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
                                        className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
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
                                        className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
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
                                        className="w-full px-3 py-2 border rounded-md bg-white border-gray-300 dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Image</label>
                                    <div
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {newRestaurant.coverImage ? (
                                            <img src={newRestaurant.coverImage} alt="Restaurant cover" width={200} height={100} className="mx-auto" />
                                        ) : (
                                            <p>Drag a JPEG image here or click to select a JPEG image file</p>
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
                )}

                {isEditModalOpen && editingRestaurant && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className={`bg-white dark:bg-black rounded-lg p-6 w-full max-w-md transition-colors`}>
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
                )}

                <div className="relative">
                    <footer className="fixed inset-x-0 bottom-0 bg-white dark:bg-black text-white transition-colors duration-200">
                        <div className="border-t border-gray-300 dark:border-[#d3a1d9] py-4 text-center">
                            <Link to="/home" className="text-sm text-gray-500 dark:text-[#d3a1d9] hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors">
                                © 2024 DigiMenu Builder. All rights reserved.
                            </Link>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}