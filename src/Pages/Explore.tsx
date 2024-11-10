import { useState, useEffect } from 'react'
import { allRestaurants } from '../components/explore/ExploreRestaurantConfig'
import Header from '../components/restaurant/Header'
import Footer from '../components/restaurant/Footer'
import ExploreRestaurants from '../components/explore/ExploreRestaurants'

export default function Explore() {
    const [darkMode, setDarkMode] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    useEffect(() => {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false); // Set dark mode if the user prefers it
        }

    }, [])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`first-line:flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors`}>
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />

                <main className="flex-grow container mx-auto px-6 py-8">
                        <ExploreRestaurants allRestaurants={allRestaurants} />
                </main>

                <Footer />
            </div>
        </div>
    )
}