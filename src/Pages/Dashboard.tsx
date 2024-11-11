import { useState, useEffect, useRef } from 'react'
import { Utensils, Image as ImageIcon, BarChart3, Star, X, Copy, Download, EyeOff, Eye } from 'lucide-react'
import Header from '../components/restaurant/Header'
import Footer from '../components/home/Footer'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'

export default function Dashboard() {
    const previewUrl = 'https://digimenu.com/restaurant/example/preview'
    const publishedUrl = 'http://localhost:3000/menu'

    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
    const [isPublished, setIsPublished] = useState(false)
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
    const [showCopyNotification, setShowCopyNotification] = useState(false)
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null)
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
    }, []);

    const toggleDarkMode = () => {
        // Toggle dark mode and save the preference in localStorage
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    useEffect(() => {
        if (isPublished) {
            generateQRCode()
        }
    }, [isPublished])

    useEffect(() => {
        return () => {
            if (copyTimeoutRef.current) {
                clearTimeout(copyTimeoutRef.current)
            }
        }
    }, [])

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
            <div className={`flex flex-col min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white transition-colors`}>
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />

                <main className="flex-grow container mx-auto px-6 py-8">
                    <div className="mb-6 flex items-center">
                        <div>
                            <nav className="flex items-center space-x-2 text-md text-gray-600 dark:text-white">
                                <Link to="/restaurant" className="hover:underline hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors">Restaurant</Link>
                                <span className="dark:text-[#d3a1d9] ">/</span>     
                                <span className="">New York Beef Burger (Tonle Basak)</span>
                            </nav>
                        </div>
                        <button
                            onClick={() => setIsPublishModalOpen(true)}
                            className={`flex justify-between items-center ml-auto px-4 py-2 rounded-lg ${isPublished ? 'bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#9f6ea3] dark:hover:bg-[#624d66]' : 'bg-[#b883e3]/75 hover:bg-[#9c6dae] dark:bg-[#d3a1d9] dark:hover:bg-[#947198]'} text-white`}
                        >
                            <div className="flex items-center">
                                {isPublished ? <Eye className="mr-2 h-5 w-5" /> : <EyeOff className="mr-2 h-5 w-5" />}
                                {isPublished ? 'Published' : 'Not Published'}
                            </div>

                        </button>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Link to="/menus">
                            <div className={`rounded-lg bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-zinc-900 shadow-md overflow-hidden transition-colors border border-gray-500 dark:border-[#947198]`}>
                                <div className="p-6">
                                    <div className="flex justify-center mb-4">
                                        <Utensils className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-center mb-2">Menus</h3>
                                    <p className={`text-center text-gray-600 dark:text-gray-400`}>
                                        Manage the menus, categories and individual menu items of your restaurant
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link to="/banners">
                            <div className={`rounded-lg bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-zinc-900 shadow-md overflow-hidden transition-colors border border-gray-500 dark:border-[#947198]`}>
                                <div className="p-6">
                                    <div className="flex justify-center mb-4">
                                        <ImageIcon className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-center mb-2">Banners</h3>
                                    <p className={`text-center text-gray-600 dark:text-gray-400`}>
                                        Manage banners that could be used to display promotional content in your restaurant menu
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div className={`rounded-lg bg-white dark:bg-black shadow-md overflow-hidden opacity-70 border border-gray-500 dark:border-[#947198]`}>
                            <div className="p-6">
                                <div className="flex justify-center mb-4">
                                    <Star className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2">Feedback (Coming Soon)</h3>
                                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                                    View feedback received from your restaurant customers
                                </p>
                            </div>
                        </div>
                        <div className={`rounded-lg bg-white dark:bg-black shadow-md overflow-hidden opacity-70 border border-gray-500 dark:border-[#947198]`}>
                            <div className="p-6">
                                <div className="flex justify-center mb-4">
                                    <BarChart3 className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2">Stats (Coming Soon)</h3>
                                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                                    Gain insights on how many people view your published menu and which items are most popular
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Publish Modal */}
                    {isPublishModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                            <div className={`bg-white dark:bg-black rounded-lg p-6 w-full max-w-md relative border border-gray-600 dark:border-[#947198]`}>
                                <button
                                    onClick={() => setIsPublishModalOpen(false)}
                                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <h2 className="text-xl font-semibold mb-4">Publish and share your menu</h2>

                                {/* Status Message */}
                                <div className={`p-4 rounded-lg mb-4 ${isPublished
                                    ? 'bg-green-50 text-green-700 dark:bg-green-600/25 dark:text-green-50'
                                    : 'bg-yellow-50 text-orange-700 dark:bg-red-500/25 dark:text-orange-100'
                                    }`}>
                                    <div className="flex items-start">
                                        {isPublished ? (
                                            <>
                                                <div className="flex-shrink-0">✓</div>
                                                <div className="ml-3">
                                                    <p className="font-medium">Menu is published</p>
                                                    <p className="mt-1 text-sm">Changes to the menu could take around 30 minutes to be reflected in the published menu page</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex-shrink-0">!</div>
                                                <div className="ml-3">
                                                    <p className="font-medium">Menu is not published</p>
                                                    <p className="mt-1 text-sm">
                                                        Please publish the menu once you have finalized your changes. Once published, you will be able to either share the direct URL or the QR code for your menu with your customers
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Publish Toggle */}
                                <div className={`flex items-center justify-between p-4 rounded-lg mb-4 bg-gray-100 dark:bg-fuchsia-300/15`}>
                                    <span className="font-medium">Publish Menu</span>
                                    <button
                                        onClick={() => setIsPublished(!isPublished)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isPublished ? 'bg-[#71389d] dark:bg-[#947198]' : 'bg-gray-300 dark:bg-[#b6a5b8]'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublished ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Published URL */}
                                {isPublished && (
                                    <>
                                        <div className="mb-4">
                                            <p className="text-sm font-medium mb-2">Published menu URL</p>
                                            <div className={`flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-fuchsia-300/15`}>
                                                <span className="text-sm truncate flex-1">
                                                    <a href={publishedUrl} target="_blank" rel="noopener noreferrer">
                                                        {publishedUrl}
                                                    </a>
                                                </span>
                                                <div className="relative">
                                                    <button
                                                        onClick={() => handleCopyUrl(publishedUrl)}
                                                        className="p-1 rounded"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </button>
                                                    {showCopyNotification && copiedUrl === publishedUrl && (
                                                        <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                                            URL copied!
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* QR Code */}
                                        {qrCodeUrl && (
                                            <div className="mb-4">
                                                <div className="flex justify-center mb-4">
                                                    <img src={qrCodeUrl} alt="Menu QR Code" width={200} height={200} />
                                                </div>
                                                <button
                                                    onClick={handleDownloadQR}
                                                    className="w-full flex items-center justify-center gap-2 text-[#71389d] hover:text-[#4f276d] dark:text-[#d3a1d9] dark:hover:text-[#947198]"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download QR code
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Preview URL */}
                                <div>
                                    <p className="text-sm font-medium mb-2">Preview URL</p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        The following URL can be used for testing purposes as it will mimic the interface of actual menu while also updating in real time
                                    </p>
                                    <div className={`flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-fuchsia-300/15`}>
                                        <span className="text-sm truncate flex-1">
                                            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                                                {previewUrl}
                                            </a>
                                        </span>
                                        <div className="relative">
                                            <button
                                                onClick={() => handleCopyUrl(previewUrl)}
                                                className="p-1 hover:bg-gray-200 rounded"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </button>
                                            {showCopyNotification && copiedUrl === previewUrl && (
                                                <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2">
                                                    URL copied!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </div>
    )
}