import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Plus, Pencil, Trash, ChevronDown, X, ImageIcon, Edit } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenusBreadcrumb from '../components/menus/MenusBreadcrumb'
import PublishModal from '../components/dashboard/PublishModal'
import QRCode from 'qrcode'
import DeleteConfirmationModal from '../components/menus/DeleteConfirmationModal'


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

export default function MenusPage() {
    const [categories, setCategories] = useState<MenuCategory[]>([
        {
            id: '1',
            name: 'Breakfast Menu',
            items: []
        },
        {
            id: '2',
            name: 'Lunch Specials',
            items: []
        },
        {
            id: '3',
            name: 'Dinner Selection',
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
    const [newItem, setNewItem] = useState<MenuItem>({
        id: '',
        name: '',
        price: '',
        description: '',
        image: ''
    })
    const [editingCategory, setEditingCategory] = useState<MenuCategory | null>(null)
    const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false)
    const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false)
    const [deletingCategory, setDeletingCategory] = useState<MenuCategory | null>(null)
    const [openCategoryMenu, setOpenCategoryMenu] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const editFileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openCategoryMenu && !(event.target as Element).closest('.category-menu')) {
                setOpenCategoryMenu(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openCategoryMenu])

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

    const handleEditCategory = (category: MenuCategory) => {
        setEditingCategory(category)
        setIsEditCategoryOpen(true)
        setOpenCategoryMenu(null)
    }

    const handleUpdateCategory = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingCategory && editingCategory.name.trim()) {
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id ? editingCategory : cat
            ))
            setIsEditCategoryOpen(false)
            setEditingCategory(null)
        }
    }

    const handleDeleteCategory = (category: MenuCategory) => {
        setDeletingCategory(category)
        setIsDeleteCategoryOpen(true)
        setOpenCategoryMenu(null)
    }

    const confirmDeleteCategory = () => {
        if (deletingCategory) {
            setCategories(categories.filter(cat => cat.id !== deletingCategory.id))
            if (selectedCategory === deletingCategory.id) {
                setSelectedCategory(categories[0]?.id || '')
            }
            setIsDeleteCategoryOpen(false)
            setDeletingCategory(null)
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
            const addedItem: MenuItem = {
                ...newItem,
                id: Date.now().toString(),
                description: newItem.description.trim() || 'No Description'
            }
            setCategories(categories.map(category => {
                if (category.id === selectedCategory) {
                    return {
                        ...category,
                        items: [...category.items, addedItem]
                    }
                }
                return category
            }))
            setNewItem({ id: '', name: '', price: '', description: '', image: '' })
            setIsAddItemOpen(false)
        }
    }

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>, isEdit: boolean = false) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handleImageFile(file, isEdit)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
        const file = e.target.files?.[0]
        handleImageFile(file, isEdit)
    }

    const handleImageFile = (file: File | undefined, isEdit: boolean) => {
        if (file && file.type.startsWith('image/')) {
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

    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const [darkMode, setDarkMode] = useState(() => {
        // Initialize with localStorage preference or default to light mode
        return localStorage.getItem('darkMode') === 'true';
    });

    const toggleDarkMode = () => {
        // Toggle dark mode and save the preference in localStorage
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    const [isPublished, setIsPublished] = useState(false)
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

    const previewUrl = 'https://digimenu.com/restaurant/example/preview'
    const publishedUrl = 'http://localhost:3000/menu'

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

    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [showCopyNotification, setShowCopyNotification] = useState(false)
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
                                            ? 'bg-[#764ab3]/20 text-[#764ab3] border-[#764ab3] dark:bg-[#d3a1d9] dark:text-white dark:border-[#d3a1d9]'
                                            : 'bg-gray-50 hover:bg-gray-200 border-gray-200 dark:bg-transparent dark:text-[#947198] dark:border-[#947198]'
                                            }`}
                                        onClick={() => setSelectedCategory(category.id)}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-lg">{category.name}</span>
                                        </div>
                                        <div className="relative category-menu">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenCategoryMenu(openCategoryMenu === category.id ? null : category.id);
                                                }}
                                                className="p-1 rounded-full"
                                            >
                                                <MoreVertical className="h-5 w-5 text-gray-400 dark:text-white" />
                                            </button>
                                            {openCategoryMenu === category.id && (
                                                <div className="absolute right-0 mt-2 w-48 p-1 rounded-lg shadow-lg z-10 bg-white dark:bg-black border border-gray-400 dark:border-[#947198]">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleEditCategory(category)}
                                                            className="flex items-center w-full px-4 py-2 text-sm rounded text-gray-600 dark:text-[#d3a1d9] hover:bg-red-100 dark:hover:bg-fuchsia-300/25"
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteCategory(category)}
                                                            className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                                                        >
                                                            <Trash className="mr-2 h-4 w-4 text-red-500 dark:text-red-600" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsAddMenuOpen(true)}
                                className="w-full p-4 mt-2 text-[#764ab3] dark:text-[#947198] bg-transparent dark:bg-transparent rounded-lg flex items-center justify-center hover:bg-[#764ab3]/20 dark:hover:bg-[#947198]/20"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Menu
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1">
                            <div className="bg-gray-300 dark:bg-fuchsia-300 bg-opacity-10 dark:bg-opacity-10 rounded-lg p-6 border border-gray-200 dark:border-[#947198]">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">
                                        {categories.find(c => c.id === selectedCategory)?.name}
                                    </h2>
                                    <button className="p-2 rounded-lg">
                                        <ChevronDown className="h-5 w-5 text-gray-400 dark:text-white" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {categories
                                        .find(c => c.id === selectedCategory)
                                        ?.items.map(item => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between py-4 border-b last:border-0 border-gray-200 dark:border-[#947198]"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-gray-50 dark:bg-transparent rounded-lg flex items-center justify-center border dark:border-[#947198]/30">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} width={64} height={64} className="rounded-lg object-cover" />
                                                        ) : <span className="text-xs text-gray-500 dark:text-[#947198]/30">No Image</span>
                                                        }
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-black dark:text-white">{item.name}</h3>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">{item.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg text-black dark:text-white">$ {item.price}</span>
                                                    <button
                                                        onClick={() => handleEditItem(item)}
                                                        className="p-2 rounded-lg"
                                                    >
                                                        <Pencil className="h-4 w-4 text-gray-400 hover:text-gray-500 dark:text-white dark:hover:text-gray-300" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteItem(item)}
                                                        className="p-2 rounded-lg"
                                                    >
                                                        <Trash className="h-4 w-4 text-red-400 hover:text-red-600 dark:text-[#d3a1d9] dark:hover:text-fuchsia-300 " />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>

                                <button
                                    onClick={() => setIsAddItemOpen(true)}
                                    className="mt-4 flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                                >
                                    <Plus className="h-4 w-4 mr-1 " />
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Add Menu Modal */}
                {isAddMenuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Create Menu</h2>
                                    <button
                                        onClick={() => setIsAddMenuOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddMenu}>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Name</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newMenuName}
                                            onChange={(e) => setNewMenuName(e.target.value)}
                                            placeholder="Menu Name"
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Category Modal */}
                {isEditCategoryOpen && editingCategory && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Edit Category</h2>
                                    <button
                                        onClick={() => {
                                            setIsEditCategoryOpen(false)
                                            setEditingCategory(null)
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleUpdateCategory}>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Name</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingCategory.name}
                                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Category Confirmation Modal */}
                {isDeleteCategoryOpen && deletingCategory && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Delete {deletingCategory.name} category</h2>
                                    <button
                                        onClick={() => {
                                            setIsDeleteCategoryOpen(false)
                                            setDeletingCategory(null)
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <p className="text-gray-600 dark:text-white mb-6">
                                    Are you sure you want to delete this category? This action cannot be undone and will delete all items in this category.
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={confirmDeleteCategory}
                                        className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                    >
                                        Confirm Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Item Modal */}
                {isAddItemOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Create Menu Item</h2>
                                    <button
                                        onClick={() => setIsAddItemOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddItem}>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Name</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newItem.name}
                                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                            placeholder="Item Name"
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Price</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={newItem.price}
                                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                            placeholder="$10.00"
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Description</span>
                                        </label>
                                        <textarea
                                            value={newItem.description}
                                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Image</span>
                                        </label>
                                        <div
                                            onClick={() => fileInputRef.current.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleImageDrop(e)}
                                            className="border-2 border-dashed border-[#764ab3] dark:border-[#947198] rounded-lg p-8 text-center cursor-pointer"
                                        >
                                            {newItem.image ? (
                                                <img src={newItem.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] dark:text-[#947198] mb-4" />
                                                    <p className="text-sm text-[#764ab3] dark:text-[#947198]">
                                                        Drag an image here or click to select an image file
                                                    </p>
                                                </>
                                            )}
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e)}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
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
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Update Menu Item</h2>
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
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Name</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.name}
                                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Price</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={editingItem.price}
                                            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Description</span>
                                        </label>
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                            className="w-full px-3 py-2 text-black dark:text-white dark:bg-black border border-gray-300 dark:border-[#947198] rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] dark:focus:ring-[#947198] focus:border-transparent"
                                            rows={4}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2">
                                            <span className="text-gray-700 dark:text-white">Image</span>
                                        </label>
                                        <div
                                            onClick={() => editFileInputRef.current.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => handleImageDrop(e, true)}
                                            className="border-2 border-dashed border-[#764ab3] dark:border-[#947198] rounded-lg p-8 text-center cursor-pointer"
                                        >
                                            {editingItem.image ? (
                                                <img src={editingItem.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] dark:text-[#947198] mb-4" />
                                                    <p className="text-sm text-[#764ab3] dark:text-[#947198]">
                                                        Drag an image here or click to select an image file
                                                    </p>
                                                </>
                                            )}
                                            <input
                                                ref={editFileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, true)}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#764ab3] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#764ab3] focus:border-transparent"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Item Confirmation Modal */}
                {isDeleteConfirmOpen && deletingItem && (
                    <DeleteConfirmationModal
                        deletingItem={deletingItem}
                        setIsDeleteConfirmOpen={setIsDeleteConfirmOpen}
                        setDeletingItem={setDeletingItem}
                        confirmDelete={confirmDelete}
                    />
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