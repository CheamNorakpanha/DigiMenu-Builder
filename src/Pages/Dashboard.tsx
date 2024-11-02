import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, X } from 'lucide-react'
import Header from '../components/dashboard/Header'
import { allRestaurants } from '../components/dashboard/ExploreRestaurantConfig';

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
    const [newRestaurant, setNewRestaurant] = useState<Omit<Restaurant, 'id'>>({
        name: '',
        location: '',
        contactNumber: '',
        coverImage: ''
    })
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Check for user's preferred color scheme
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false); // Set dark mode if the user prefers it
        }

        // Listen for changes in color scheme preference
        const handleChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleChange);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNewRestaurant(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewRestaurant(prev => ({ ...prev, coverImage: reader.result as string }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files?.[0]
        if (file && file.type.startsWith('image/jpeg')) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setNewRestaurant(prev => ({ ...prev, coverImage: reader.result as string }))
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
                                    <div key={restaurant.id} className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden border border-gray-500 dark:border-[#947198]">
                                        <img
                                            src={restaurant.coverImage}
                                            alt={`${restaurant.name} cover`}
                                            width={400}
                                            height={200}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                                            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>{restaurant.location}</p>
                                            {/* <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{restaurant.contactNumber}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='mb-20'>
                            <h1 className="text-3xl font-bold mb-4">Explore Restaurants</h1>
                            <p className="text-gray-600 mb-8 dark:text-[#947198]">
                                Following are the restaurants published by all users.
                            </p>
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
                        <div className="bg-white dark:bg-black rounded-lg p-6 w-full max-w-md transition-colors">
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
                                        placeholder="Restaurant Name"
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
                                        placeholder="No 01, Street Name, City"
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
                                        placeholder="Phone Number"
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
                                            <p className="dark:text-[#684F6A]">Drag a JPEG image here or click to select a JPEG image file</p>
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
                                    className="w-full py-2 px-4 rounded-md bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white "
                                >
                                    Save
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