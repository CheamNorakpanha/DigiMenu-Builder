import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MyRestaurants from '../components/restaurant/MyRestaurants'
import AddRestaurantModal from '../components/restaurant/AddRestaurantModal'
import EditRestaurantModal from '../components/restaurant/EditRestaurantModal'

type RestaurantData = {
    id: string
    name: string
    location: string
    contactNumber: string
    coverImage: string
}

export default function Restaurant() {
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [newRestaurant, setNewRestaurant] = useState<Omit<RestaurantData, 'id'>>({
        name: 'New York Beef Burger (Tonle Basak)',
        location: 'St. 308, Sangkat Tonle Bassac, Khan Chamkar Mon, Phnom Penh',
        contactNumber: '1234567890',
        coverImage: 'https://img.freepik.com/free-photo/street-food-still-life_23-2151535299.jpg?t=st=1730601966~exp=1730605566~hmac=fc0f6c9f9e53b3e36b1f93e7c577fc1117b0620fa16d8dcf23f87723ca4840be&w=1380'
    })
    const [editingRestaurant, setEditingRestaurant] = useState<RestaurantData | null>(null)
    const [restaurants, setRestaurants] = useState<RestaurantData[]>([])
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize with localStorage preference or default to light mode
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        // Listen to system theme changes and apply them if there’s no saved preference
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (e) => {
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches);
            }
        };

        darkModeMediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleThemeChange);
        };

    }, [])

    const toggleDarkMode = () => {
        // Toggle dark mode and save the preference in localStorage
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

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
                {/* Header NavBar */}
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />

                {/* MyRestaurants Section */}
                <main className="flex-grow container mx-auto px-6 py-8">
                    <MyRestaurants
                        restaurants={restaurants}
                        setIsModalOpen={setIsModalOpen}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        dropdownRef={dropdownRef}
                    />
                </main>

                {/* AddRestaurant Modal */}
                {isModalOpen && (
                    <AddRestaurantModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        newRestaurant={newRestaurant}
                        handleInputChange={handleInputChange}
                        handleSave={handleSave}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleImageUpload={handleImageUpload}
                    />
                )}

                {/* EditRestaurant Modal */}
                {isEditModalOpen && editingRestaurant && (
                    <EditRestaurantModal
                        isOpen={isEditModalOpen}
                        editingRestaurant={editingRestaurant}
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleInputChange={handleInputChange}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleImageUpload={handleImageUpload}
                        handleUpdate={handleUpdate}
                        editFileInputRef={editFileInputRef}
                    />
                )}

                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}