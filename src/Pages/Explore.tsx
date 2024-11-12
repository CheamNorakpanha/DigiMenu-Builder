import { useState, useEffect } from 'react'
import { allRestaurants } from '../components/explore/ExploreRestaurantConfig'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ExploreRestaurants from '../components/explore/ExploreRestaurants'

export default function Explore() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
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

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors">
                {/* Header NavBar */}
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />
                
                {/* Explore Restaurants */}
                <main className="flex-grow container mx-auto px-6 py-8">
                    <ExploreRestaurants allRestaurants={allRestaurants} />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}
