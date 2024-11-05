import { useState, useEffect } from 'react'
import Footer from '../components/menu/Footer'
import HeroSection from '../components/menu/HeroSection'
import MenuNavigation from '../components/menu/MenuNavigation'
import MenuContent from '../components/menu/MenuContent'
import { menuItems, popular, otherSections } from '../components/menu/menuData';

export default function Menu() {
    const [activeSection, setActiveSection] = useState('Popular')
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false);
        }
        darkModeMediaQuery.addEventListener('change', e => setDarkMode(e.matches));
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`flex flex-col min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white `}>
                {/* Hero Section */}
                <HeroSection />

                {/* Navigation */}
                <MenuNavigation
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    menuItems={menuItems}
                />

                {/* Menu Content */}
                <main className="container mx-auto px-4 py-8">
                    <MenuContent
                        activeSection={activeSection}
                        popular={popular}
                        otherSections={otherSections}
                    />
                </main>

                <Footer />
            </div>
        </div>
    )
}