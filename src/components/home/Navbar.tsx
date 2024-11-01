import { Link } from 'react-scroll';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
    return (
        <header className="px-40 h-16 flex items-center border-b border-gray-200 dark:border-[#947198] bg-white dark:bg-black transition-colors duration-200">
            <Link to="top" className="flex items-center justify-center cursor-pointer">
                <span className="ml-2 text-xl font-bold text-[#764ab3] dark:text-[#764ab3]">DigiMenu Builder</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link
                    to="how-it-works"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={1000}
                    className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9] cursor-pointer">
                    How It Works
                </Link>
                <Link
                    to="features"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={1000}
                    className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9] cursor-pointer">
                    Features
                </Link>
                <Link
                    to="pricing"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={1000}
                    className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9] cursor-pointer">
                    Pricing
                </Link>
                <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={50}
                    duration={1000}
                    className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9] cursor-pointer">
                    Contact
                </Link>
                <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-transparent dark:bg-transparent text-gray-500 dark:text-yellow-400 border border-gray-500">
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </nav>
        </header>
    );
}