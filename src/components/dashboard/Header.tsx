import { Link } from 'react-router-dom'
import { Sun, Moon, LogOut } from 'lucide-react'

type HeaderProps = {
    darkMode: boolean;
    toggleDarkMode: () => void;
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;
    activeTab: 'myRestaurants' | 'explore';
    setActiveTab: (tab: 'myRestaurants' | 'explore') => void;
};

export default function Navbar({ darkMode, toggleDarkMode, isProfileOpen, setIsProfileOpen, activeTab, setActiveTab }: HeaderProps) {
    return (
        <header className="bg-white dark:bg-black shadow border-b border-gray-300 dark:border-[#947198] transition-colors">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-gray-800 hover:text-gray-600">
                            {/* A logo */}
                            <span className="ml-2 text-xl font-bold text-[#764ab3] dark:text-[#764ab3]">DigiMenu Builder</span>
                        </Link>
                        <div className="ml-10 space-x-4">
                            <button
                                onClick={() => setActiveTab('myRestaurants')}
                                className={`text-[#764ab3] dark:text-[#d3a1d9] hover:text-[#764ab3] dark:hover:text-[#d3a1d9]
                                        ${activeTab === 'myRestaurants' ? 'font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                Restaurants
                            </button>
                            <button
                                onClick={() => setActiveTab('explore')}
                                className={`text-[#764ab3] dark:text-[#d3a1d9] hover:text-[#764ab3] dark:hover:text-[#d3a1d9]
                                        ${activeTab === 'explore' ? ' font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                Explore
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-transparent dark:bg-transparent text-gray-500 dark:text-yellow-400 border border-gray-500">
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 text-gray-800"
                            >
                                <img className="w-10 h-10 rounded-lg" src="https://i.pinimg.com/564x/1b/fe/36/1bfe365fd8dcf18d5d43304999057a6e.jpg" alt="Default avatar" />
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black border border-gray-400 dark:border-[#947198] p-1">
                                    <p className='w-full px-4 py-2 text-sm text-gray-600 dark:text-[#d3a1d9]'>Cheam Norakpanha</p>
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-sm rounded text-red-500 dark:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                                    >
                                        <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-600" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}