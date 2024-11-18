import { useState, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MenusBreadcrumb from '../components/menus/MenusBreadcrumb'
import PublishModal from '../components/dashboard/PublishModal'
import QRCode from 'qrcode'
import DeleteConfirmationModal from '../components/menus/DeleteConfirmationModal'
import UpdateMenuItemModal from '../components/menus/UpdateMenuItemModal'
import AddMenuItemModal from '../components/menus/AddMenuItemModal'
import DeleteCategoryModal from '../components/menus/DeleteCategoryModal'
import EditCategoryModal from '../components/menus/EditCategoryModal'
import AddMenuModal from '../components/menus/AddMenuModal'
import CategoryItemList from '../components/menus/CategoryItemList'
import CategorySidebar from '../components/menus/CategorySidebar'

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
                        <CategorySidebar
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            handleEditCategory={handleEditCategory}
                            handleDeleteCategory={handleDeleteCategory}
                            setIsAddMenuOpen={setIsAddMenuOpen}
                            openCategoryMenu={openCategoryMenu}
                            setOpenCategoryMenu={setOpenCategoryMenu}
                        />

                        {/* Menu Items */}
                        <CategoryItemList
                            categories={categories}
                            selectedCategory={selectedCategory}
                            handleEditItem={handleEditItem}
                            handleDeleteItem={handleDeleteItem}
                            setIsAddItemOpen={setIsAddItemOpen}
                        />
                    </div>
                </main>

                {/* Add Menu Modal */}
                {isAddMenuOpen && (
                    <AddMenuModal
                        newMenuName={newMenuName}
                        setNewMenuName={setNewMenuName}
                        setIsAddMenuOpen={setIsAddMenuOpen}
                        handleAddMenu={handleAddMenu}
                    />
                )}

                {/* Edit Category Modal */}
                {isEditCategoryOpen && editingCategory && (
                    <EditCategoryModal
                        editingCategory={editingCategory}
                        setIsEditCategoryOpen={setIsEditCategoryOpen}
                        setEditingCategory={setEditingCategory}
                        handleUpdateCategory={handleUpdateCategory}
                    />
                )}

                {/* Delete Category Confirmation Modal */}
                {isDeleteCategoryOpen && deletingCategory && (
                    <DeleteCategoryModal
                        deletingCategory={deletingCategory}
                        setIsDeleteCategoryOpen={setIsDeleteCategoryOpen}
                        setDeletingCategory={setDeletingCategory}
                        confirmDeleteCategory={confirmDeleteCategory}
                    />
                )}

                {/* Add Item Modal */}
                {isAddItemOpen && (
                    <AddMenuItemModal
                        newItem={newItem}
                        setNewItem={setNewItem}
                        handleAddItem={handleAddItem}
                        setIsAddItemOpen={setIsAddItemOpen}
                        fileInputRef={fileInputRef}
                        handleImageDrop={handleImageDrop}
                        handleImageChange={handleImageChange}
                    />
                )}

                {/* Edit Item Modal */}
                {isEditItemOpen && editingItem && (
                    <UpdateMenuItemModal
                        editingItem={editingItem}
                        setEditingItem={setEditingItem}
                        setIsEditItemOpen={setIsEditItemOpen}
                        handleUpdateItem={handleUpdateItem}
                        handleImageChange={handleImageChange}
                        handleImageDrop={handleImageDrop}
                    />
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