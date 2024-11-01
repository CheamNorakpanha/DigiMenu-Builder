import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Sun, Moon, LogOut, X } from 'lucide-react'

type Restaurant = {
    id: string
    name: string
    location: string
    contactNumber: string
    coverImage: string
}

type ExploreRestaurant = {
    Eid: string
    Ename: string
    Eaddress: string
    EcoverImage: string
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

    // URLs for restaurant cover images
    const image1 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/9f/4a/50/brasserie-dining-room.jpg?w=1000&h=-1&s=1';
    const image2 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/ac/d2/f4/namaste-india-bkk-a-touch.jpg?w=1000&h=-1&s=1';
    const image3 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/49/e0/0c/restaurant-le-royal-at.jpg?w=900&h=-1&s=1';
    const image4 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/bf/3d/d1/lantern-rooftop-bar-live.jpg?w=1000&h=-1&s=1';
    const image5 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/3a/71/c4/caption.jpg?w=900&h=500&s=1';
    const image6 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/e8/4e/ed/view-from-the-stage-area.jpg?w=1000&h=-1&s=1';
    const image7 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c6/8f/89/hyatt-regency-the-attic.jpg?w=1000&h=-1&s=1';
    const image8 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/38/92/c0/hall-of-golden-chimes.jpg?w=1000&h=-1&s=1';
    const image9 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/15/c3/b3/hemisphere-rooftop.jpg?w=1000&h=-1&s=1';

    // Mock data for restaurants
    const allRestaurants: ExploreRestaurant[] = [
        { Eid: '1', Ename: "Brasserie Louis", Eaddress: "66 Monivong Boulevard, Phnom Penh 120211 Cambodia", EcoverImage: image1 },
        { Eid: '2', Ename: "Namaste India Restaurant BKK", Eaddress: "#177, Street 63 Corner 294, Phnom Penh 12302 Cambodia", EcoverImage: image2 },
        { Eid: '3', Ename: "Restaurant Le Royal", Eaddress: "92 Rukhak Vithei Daun Penh Sangkat Wat Phnom, Phnom Penh 12202 Cambodia", EcoverImage: image3 },
        { Eid: '4', Ename: "Lantern Rooftop Bar", Eaddress: "Baitong Hotel and Resort, number 10, St. 282 Sangkat Boeng Keng Kang I, Khan Chamkarmon, Phnom Penh 12302 Cambodia", EcoverImage: image4 },
        { Eid: '5', Ename: "Boma - Mediterranean Cuisine", Eaddress: "Rue Pasteur No. 51, Phnom Penh 12302 Cambodia", EcoverImage: image5 },
        { Eid: '6', Ename: "Yiqi", Eaddress: "282 7th Floor #5 St Rise Commercial, BKK1, Phnom Penh 12000 Cambodia", EcoverImage: image6 },
        { Eid: '7', Ename: "The Attic", Eaddress: "#55, Street 178 Sangkat Chey Chumnas, Phnom Penh 12206 Cambodia", EcoverImage: image7 },
        { Eid: '8', Ename: "Hall of Golden Chimes", Eaddress: "Level 5, NagaWorld2 Samdech Hun Sen Park, Phnom Penh 120101 Cambodia", EcoverImage: image8 },
        { Eid: '9', Ename: "Hemisphere Sky Bar", Eaddress: "No 47 Corner St 01 And St 94 Village 9 On Top Of Tribe Hotel, 11th Floor, Phnom Penh 12202 Cambodia", EcoverImage: image9 },
    ];

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`first-line:flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors`}>
                <header className="bg-white dark:bg-black shadow border-b border-gray-300 dark:border-[#947198] transition-colors">
                    <nav className="container mx-auto px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
                                    {/* A logo */}
                                    <span className="ml-2 text-xl font-bold text-[#764ab3] dark:text-[#764ab3]">DigiMenu Builder</span>
                                </Link>
                                <div className="ml-10 space-x-4">
                                    <button
                                        onClick={() => setActiveTab('myRestaurants')}
                                        className={`text-[#764ab3] dark:text-[#d3a1d9] hover:text-[#764ab3] dark:hover:text-[#d3a1d9]
                                        ${activeTab === 'myRestaurants' ? 'font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        Restaurants
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('explore')}
                                        className={`text-[#764ab3] dark:text-[#d3a1d9] hover:text-[#764ab3] dark:hover:text-[#d3a1d9]
                                        ${activeTab === 'explore' ? ' font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                                    >
                                        Explore
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-transparent dark:bg-transparent text-gray-500 dark:text-yellow-400 border border-gray-500">
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center space-x-2 text-gray-800"
                                    >
                                        <img className="w-10 h-10 rounded-lg" src="https://i.pinimg.com/564x/1b/fe/36/1bfe365fd8dcf18d5d43304999057a6e.jpg" alt="Default avatar" />
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black border border-gray-400 dark:border-[#947198] p-1">
                                            <p className='w-full px-4 py-2 text-sm text-gray-600 dark:text-[#d3a1d9]'>Cheam Norakpanha</p>
                                            <button
                                                className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                                            >
                                                <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-600" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

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