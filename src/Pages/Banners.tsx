import { useState, useRef, useEffect } from 'react'
import { X, ImageIcon } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BannersBreadcrumb from '../components/banners/BannersBreadcrumb'
import PublishModal from '../components/dashboard/PublishModal'
import QRCode from 'qrcode'
import BannerCard from '../components/banners/BannerCard'
import AddBannerCard from '../components/banners/AddBannerCard'
import DeleteBannerModal from '../components/banners/DeleteBannerModalProps'
import getCroppedImg from '../components/cropImage' 
import Cropper from 'react-easy-crop';
interface Banner {
    id: string
    image: string
}

export default function Banners() {
    const [isAddBannerOpen, setIsAddBannerOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null)
    const [banners, setBanners] = useState<Banner[]>([])
    const [newBanner, setNewBanner] = useState<Banner>({
        id: '',
        image: ''
    })
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    const [croppedImage, setCroppedImage] = useState<string | null>(null)
    const [imageForCrop, setImageForCrop] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0);
    const [cropArea, setCropArea] = useState(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        handleImageFile(file)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (file && file.type.startsWith('image/jpeg')) {
                    const reader = new FileReader()
                    reader.onload = () => {
                        setImageForCrop(reader.result as string) // Set the image for cropping
                    }
                    reader.readAsDataURL(file)
                }
            }

    const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
                setCropArea(croppedAreaPixels)
                }

    const handleCropSave = async () => {
        if (imageForCrop && cropArea) {
            const croppedImageUrl = await getCroppedImg(imageForCrop, cropArea)
            setCroppedImage(croppedImageUrl)
            setNewBanner({ ...newBanner, image: croppedImageUrl as string })
            setImageForCrop(null) 
        }
    }


    const handleImageFile = (file: File | undefined) => {
        if (file && file.type.startsWith('image/jpeg')) {
            const reader = new FileReader()
            reader.onload = () => {
                setNewBanner({ ...newBanner, image: reader.result as string })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddBanner = (e: React.FormEvent) => {
        e.preventDefault()
        if (newBanner.image) {
            const banner = {
                id: Date.now().toString(),
                image: newBanner.image
            }
            setBanners([...banners, banner])
            setNewBanner({ id: '', image: '' })
            setIsAddBannerOpen(false)
        }
    }

    const openDeleteModal = (banner: Banner) => {
        setBannerToDelete(banner)
        setIsDeleteModalOpen(true)
        setOpenMenuId(null)
    }

    const handleDeleteBanner = () => {
        if (bannerToDelete) {
            setBanners(banners.filter(banner => banner.id !== bannerToDelete.id))
            setIsDeleteModalOpen(false)
            setBannerToDelete(null)
        }
    }

    const toggleMenu = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenMenuId(openMenuId === id ? null : id)
    }

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

    const [isProfileOpen, setIsProfileOpen] = useState(false)
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

    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const [showCopyNotification, setShowCopyNotification] = useState(false)
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
                    <BannersBreadcrumb
                        isPublished={isPublished}
                        setIsPublishModalOpen={setIsPublishModalOpen}
                    />

                    {/* Banners Grid */}
                    <div className="transition-colors grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {banners.map((banner) => (
                            <BannerCard
                                key={banner.id}
                                banner={banner}
                                openMenuId={openMenuId}
                                toggleMenu={toggleMenu}
                                openDeleteModal={openDeleteModal}
                            />
                        ))}

                        {/* Add New Banner Card */}
                        <AddBannerCard setIsAddBannerOpen={setIsAddBannerOpen} />
                    </div>


                </main>

                {/* Add Banner Modal */}
                {isAddBannerOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg w-full max-w-md mx-4 border dark:border-[#947198]/75">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-black dark:text-white">Add Banner</h2>
                                    <button
                                        onClick={() => setIsAddBannerOpen(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                                <form onSubmit={handleAddBanner}>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium">
                                            <span className="text-gray-700 dark:text-white">Image</span>
                                            <span className="text-[#764ab3] dark:text-[#947198] ml-1">*</span>
                                        </label>
                                        <div
                                            onClick={() => fileInputRef.current.click()}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleImageDrop}
                                            className="border-2 border-dashed border-[#764ab3] rounded-lg p-8 text-center cursor-pointer dark:bg-transparent dark:border-[#947198] dark:placeholder:text-[#684F6A]"
                                        >
                                            {newBanner.image ? (
                                                <img src={newBanner.image} alt="Preview" width={200} height={200} className="mx-auto rounded-lg" />
                                            ) : (
                                                <>
                                                    <ImageIcon className="mx-auto h-12 w-12 text-[#764ab3] dark:text-[#947198] mb-4" />
                                                    <p className="text-sm text-[#764ab3] dark:text-[#947198]">
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
                                            className="py-2 px-4 rounded-md bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#d3a1d9] dark:hover:bg-[#947198] text-white"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                 {/* Image Cropping Modal */}
                 {imageForCrop && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6 w-full max-w-3xl mx-4">
                            <h2 className="text-lg font-semibold mb-4">Crop Your Image</h2>
                            <div className="relative w-full h-64 bg-gray-200">
                                <Cropper
                                    image={imageForCrop}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={2.5}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotation}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => setImageForCrop(null)}
                                    className="py-2 px-4 bg-gray-400 text-white rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCropSave}
                                    className="py-2 px-4 bg-[#71389d] text-white rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {/* Delete Confirmation Modal */}
                {isDeleteModalOpen && (
                    <DeleteBannerModal
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        setBannerToDelete={setBannerToDelete}
                        handleDeleteBanner={handleDeleteBanner}
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


