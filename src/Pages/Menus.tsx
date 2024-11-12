import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Plus, Pencil, Trash, ChevronDown, X, ImageIcon } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PublishModal from '../components/dashboard/PublishModal'
import QRCode from 'qrcode'
import MenusBreadcrumb from '../components/menus/MenusBreadcrumb'

interface MenuItem {
    id: string
    name: string
    price: string
    description: string
    image?: string
}

interface MenuCategory {
    id: string
    name: string
    items: MenuItem[]
}

export default function Menus() {
    const [categories, setCategories] = useState<MenuCategory[]>([
        {
            id: '1',
            name: 'Popular',
            items: []
        },
        {
            id: '2',
            name: 'Special Sets',
            items: []
        },
        {
            id: '3',
            name: 'Burger',
            items: []
        }
    ])
    const [selectedCategory, setSelectedCategory] = useState<string>('1')
    const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)
    const [isAddItemOpen, setIsAddItemOpen] = useState(false)
    const [isEditItemOpen, setIsEditItemOpen] = useState(false)
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
    const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)
    const [newMenuName, setNewMenuName] = useState('')
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    })
    const fileInputRef = useRef<HTMLInputElement>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize with localStorage preference or default to light mode
        return localStorage.getItem('darkMode') === 'true';
    });
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
    const [isPublished, setIsPublished] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const [showCopyNotification, setShowCopyNotification] = useState(false)
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)


    const previewUrl = 'https://digimenu.com/restaurant/example/preview'
    const publishedUrl = 'http://localhost:3000/menu'

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

    const handleAddMenu = (e: React.FormEvent) => {
        e.preventDefault()
        if (newMenuName.trim()) {
            const newCategory: MenuCategory = {
                id: Date.now().toString(),
                name: newMenuName.trim(),
                items: []
            }
            setCategories([...categories, newCategory])
            setNewMenuName('')
            setIsAddMenuOpen(false)
        }
    }

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item)
        setIsEditItemOpen(true)
    }

    const handleDeleteItem = (item: MenuItem) => {
        setDeletingItem(item)
        setIsDeleteConfirmOpen(true)
    }

    const confirmDelete = () => {
        if (deletingItem) {
            setCategories(categories.map(category => {
                if (category.id === selectedCategory) {
                    return {
                        ...category,
                        items: category.items.filter(item => item.id !== deletingItem.id)
                    }
                }
                return category
            }))
            setIsDeleteConfirmOpen(false)
            setDeletingItem(null)
        }
    }

    const handleUpdateItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingItem && editingItem.name.trim() && editingItem.price.trim()) {
            setCategories(categories.map(category => {
                if (category.id === selectedCategory) {
                    return {
                        ...category,
                        items: category.items.map(item =>
                            item.id === editingItem.id ? editingItem : item
                        )
                    }
                }
                return category
            }))
            setIsEditItemOpen(false)
            setEditingItem(null)
        }
    }

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault()
        if (newItem.name.trim() && newItem.price.trim()) {
            const newMenuItem: MenuItem = {
                id: Date.now().toString(),
                name: newItem.name.trim(),
                price: newItem.price.trim(),
                description: newItem.description.trim() || 'No Description',
                image: newItem.image
            }
            setCategories(categories.map(category => {
                if (category.id === selectedCategory) {
                    return {
                        ...category,
                        items: [...category.items, newMenuItem]
                    }
                }
                return category
            }))
            setNewItem({ name: '', price: '', description: '', image: '' })
            setIsAddItemOpen(false)
        }
    }

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>, isEdit: boolean = false) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/jpeg')) {
            const reader = new FileReader()
            reader.onload = () => {
                if (isEdit && editingItem) {
                    setEditingItem({ ...editingItem, image: reader.result as string })
                } else {
                    setNewItem({ ...newItem, image: reader.result as string })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleImageClick = (event: React.MouseEvent<HTMLDivElement>, isEdit: boolean = false) => {
        event.preventDefault()
        if (isEdit) {
            editFileInputRef.current?.click()
        } else {
            fileInputRef.current?.click()
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
        const file = e.target.files?.[0]
        if (file && file.type.startsWith('image/jpeg')) {
            const reader = new FileReader()
            reader.onload = () => {
                if (isEdit && editingItem) {
                    setEditingItem({ ...editingItem, image: reader.result as string })
                } else {
                    setNewItem({ ...newItem, image: reader.result as string })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (isPublished) {
            generateQRCode()
        }
    }, [isPublished])

    const generateQRCode = async () => {
        try {
            const url = await QRCode.toDataURL(publishedUrl)
            setQrCodeUrl(url)
        } catch (err) {
            console.error('Error generating QR code:', err)
        }
    }

    const handleCopyUrl = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url)
            setCopiedUrl(url)
            setShowCopyNotification(true)
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current)
            }
            copyTimeoutRef.current = setTimeout(() => {
                setShowCopyNotification(false)
                setCopiedUrl(null)
            }, 3000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleDownloadQR = () => {
        const link = document.createElement('a')
        link.download = 'menu-qr-code.png'
        link.href = qrCodeUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-white dark:bg-black">
                {/* Header */}
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <MenusBreadcrumb
                        isPublished={isPublished}
                        setIsPublishModalOpen={setIsPublishModalOpen}
                    />

                    <div className="flex gap-8">
                        {/* Categories Sidebar */}
                        <div className="w-64 flex-shrink-0">
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className={`w-full flex items-center justify-between p-4 rounded-lg text-left border ${selectedCategory === category.id
                                            ? 'bg-[#764ab3]/20 text-[#764ab3] border-[#764ab3]'
                                            : 'bg-gray-50 hover:bg-gray-200 border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => setSelectedCategory(category.id)}
                                                className="text-lg"
                                            >
                                                {category.name}
                                            </button>
                                        </div>
                                        <MoreVertical className="h-5 w-5 text-gray-400" />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setIsAddMenuOpen(true)}
                                className="w-full p-4 mt-2 text-[#764ab3] bg-white rounded-lg flex items-center justify-center hover:bg-[#764ab3]/20"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Menu
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1">
                            <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                    </h2>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {categories
                                        .find(c => c.id === selectedCategory)
                                        ?.items.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between py-4 border-b last:border-0"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-cover" />
                                                        ) : (
                                                            <span className="text-xs text-gray-500">No Image</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <p className="text-gray-500 text-sm">{item.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">${item.price}</span>
                                                    <button
                                                        onClick={() => handleEditItem(item)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <Pencil className="h-4 w-4 text-gray-400" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteItem(item)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                                    >
                                                        <Trash className="h-4 w-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <button
                                    onClick={() => setIsAddItemOpen(true)}
                                    className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700"
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>

                </main>


                {/* Add Menu Modal */}
                {isAddMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Create Menu</h2>
                                    <button
                                        onClick={() => setIsAddMenuOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddMenu}>
                                    <div className="mb-6">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Name</span>
                                            <span className="text-[#764ab3] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newMenuName}
                                            onChange={(e) => setNewMenuName(e.target.value)}
                                            placeholder="Menu Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#764ab3] text-white rounded-md hover:bg-[#4f276d]"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Item Modal */}
                {isAddItemOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Create Menu Item</h2>
                                    <button
                                        onClick={() => setIsAddItemOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddItem}>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Name</span>
                                            <span className="text-[#764ab3] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            placeholder="Item Name"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Price</span>
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                            placeholder="$10.00"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Description</span>
                                        </label>
                                        <textarea
                                            value={newItem.description}
                                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Image</span>
                                        </label>
                                        <div
                                            onClick={handleImageClick}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleImageDrop}
                                            className="border-2 border-dashed border-[#764ab3] rounded-lg p-8 text-center cursor-pointer"
                                        >
                                            {newItem.image ? (
                                                <img src={newItem.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] mb-4" />
                                                    <p className="text-sm text-[#764ab3]">
                                                        Drag a jpeg image here or click to select a jpeg image file
                                                    </p>
                                                </>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/jpeg"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Item Modal */}
                {isEditItemOpen && editingItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold">Update Menu Item</h2>
                                    <button
                                        onClick={() => {
                                            setIsEditItemOpen(false)
                                            setEditingItem(null)
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleUpdateItem}>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Name</span>
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.name}
                                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Price</span>
                                            <span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.price}
                                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Description</span>
                                        </label>
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2">
                                            <span className="text-gray-700">Image</span>
                                        </label>
                                        <div
                                            onClick={(event) => handleImageClick(event, true)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleImageDrop(e, true)}
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-red-500"
                                        >
                                            {editingItem.image ? (
                                                <img src={editingItem.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                    <p className="text-sm text-gray-500">
                                                        Drag a jpeg image here or click to select a jpeg image file
                                                    </p>
                                                </>
                                            )}
                                            <input
                                                ref={editFileInputRef}
                                                type="file"
                                                accept="image/jpeg"
                                                onChange={(e) => handleImageChange(e, true)}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteConfirmOpen && deletingItem && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">Delete {deletingItem.name} item</h2>
                                    <button
                                        onClick={() => {
                                            setIsDeleteConfirmOpen(false)
                                            setDeletingItem(null)
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <p className="text-gray-600 mb-6">
                                    Are you sure, you want to delete this menu item? This action cannot be undone
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={confirmDelete}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        Confirm Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Publish Modal */}
                <PublishModal
                    isOpen={isPublishModalOpen}
                    onClose={() => setIsPublishModalOpen(false)}
                    isPublished={isPublished}
                    setIsPublished={setIsPublished}
                    publishedUrl={publishedUrl}
                    previewUrl={previewUrl}
                    qrCodeUrl={qrCodeUrl}
                    handleCopyUrl={handleCopyUrl}
                    handleDownloadQR={handleDownloadQR}
                    showCopyNotification={showCopyNotification}
                    copiedUrl={copiedUrl}
                />

                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}