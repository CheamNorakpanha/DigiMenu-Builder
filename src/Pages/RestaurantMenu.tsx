import { useState, useEffect } from 'react'
import Footer from '../components/restaurantMenu/Footer'
import HeroSection from '../components/restaurantMenu/HeroSection'
import MenuNavigation from '../components/restaurantMenu/MenuNavigation'
import MenuContent from '../components/restaurantMenu/MenuContent'
import { menuItems, popular, otherSections } from '../components/restaurantMenu/menuData';

export default function Menu() {
    const [activeSection, setActiveSection] = useState('Popular')
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

                {/* Footer */}
                <Footer />
            </div>
        </div>
    )
}