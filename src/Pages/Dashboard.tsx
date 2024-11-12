import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/home/Footer'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import DashboardBreadcrumb from '../components/dashboard/DashboardBreadcrumb';
import DashboardMenu from '../components/dashboard/DashboardMenus'
import DashboardBanners from '../components/dashboard/DashboardBanners'
import DashboardFeedback from '../components/dashboard/DashboardFeedback'
import DashboardStats from '../components/dashboard/DashboardStats'
import PublishModal from '../components/dashboard/PublishModal'

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
                {/* Header NavBar */}
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />

                {/* Main Content */}
                <main className="flex-grow container mx-auto px-6 py-8">
                    {/* Breadcrumb */}
                    <DashboardBreadcrumb isPublished={isPublished} setIsPublishModalOpen={setIsPublishModalOpen} />

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Menus Section */}
                        <Link to="/restaurant/dashboard-new-york-beef-burger/menus">
                            <DashboardMenu />
                        </Link>

                        {/* Banners Section */}
                        <Link to="/banners">
                            <DashboardBanners />
                        </Link>

                        {/* Feedback Section */}
                        <DashboardFeedback />

                        {/* Stats Section */}
                        <DashboardStats />
                    </div>

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
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}