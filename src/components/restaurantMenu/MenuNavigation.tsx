// MenuNavigation.tsx
import { Link as ScrollLink } from 'react-scroll'
import { Sun, Moon } from 'lucide-react'

interface MenuNavigationProps {
    activeSection: string
    setActiveSection: (section: string) => void
    darkMode: boolean
    toggleDarkMode: () => void
    menuItems: { name: string, quantity: string }[]
}

export default function MenuNavigation({ activeSection, setActiveSection, darkMode, toggleDarkMode, menuItems }: MenuNavigationProps) {
    return (
        <nav className={`border-b mx-48 dark:border-[#947198] border-gray-200`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex overflow-x-auto">
                    {menuItems.map((item) => (
                        <ScrollLink
                            key={item.name}
                            to={item.name}
                            smooth={true}
                            duration={500}
                            className={`flex flex-col items-center py-4 px-6 whitespace-nowrap cursor-pointer ${activeSection === item.name
                                ? 'border-b-2 text-[#764ab3] border-[#764ab3] dark:text-[#d3a1d9] dark:border-[#d3a1d9]'
                                : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            onClick={() => setActiveSection(item.name)}
                        >
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-gray-500">{item.quantity}</span>
                        </ScrollLink>
                    ))}
                </div>
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-lg bg-transparent dark:bg-transparent text-gray-500 dark:text-yellow-400 border border-gray-500`}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>
        </nav>
    );
}