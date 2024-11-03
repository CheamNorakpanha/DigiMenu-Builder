import { useState, useEffect } from 'react'
import { MapPin, Sun, Moon } from 'lucide-react'
import { Link as ScrollLink, Element } from 'react-scroll'

interface MenuItem {
    name: string
    quantity: string
}

interface PopularItem {
    name: string
    image: string
    price: string
}

interface FoodItem {
    name: string
    image: string
    price: string
}

const Menu: React.FC = () => {
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

    const menuBackground = 'https://img.freepik.com/free-photo/street-food-still-life_23-2151535299.jpg?t=st=1730601966~exp=1730605566~hmac=fc0f6c9f9e53b3e36b1f93e7c577fc1117b0620fa16d8dcf23f87723ca4840be&w=1380';

    const menuItems: MenuItem[] = [
        { name: 'Popular', quantity: '' },
        { name: "Special Sets", quantity: '' },
        { name: 'Burger', quantity: '' },
        { name: 'A La Carte', quantity: '' },
        { name: 'Beverage', quantity: '' },
        { name: 'Beer', quantity: '' },
    ]

    // data retrieved from: https://www.foodpanda.com.kh/en/restaurant/n2n7/new-york-beef-burger-tonle-basak

    const popular: PopularItem[] = [
        { name: 'Burger Set A', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3328878.jpg??width=400', price: '4' },
        { name: 'Burger Set B', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3333039.jpg??width=400', price: '4.64' },
        { name: 'Big Mac', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307175.jpg??width=400', price: '4.80' },
        { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
        { name: 'Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307171.jpg??width=400', price: '3.20' },
        { name: 'Chicken Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307176.jpg??width=400', price: '3.04' },
    ]

    const otherSections: Record<string, FoodItem[]> = {
        "Special Sets": [
            { name: 'Burger Set A', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3328878.jpg??width=400', price: '4' },
            { name: 'Burger Set B', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3333039.jpg??width=400', price: '4.64' },
        ],
        'Burger': [
            { name: 'Big Mac', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307175.jpg??width=400', price: '4.80' },
            { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
            { name: 'Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307171.jpg??width=400', price: '3.20' },
            { name: 'Chicken Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307176.jpg??width=400', price: '3.04' },
            { name: 'Double Egg Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307178.jpg??width=400', price: '3.36' },
            { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
        ],
        'A La Carte': [
            { name: 'French Fries', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307179.jpg??width=400', price: '1.20' },
            { name: 'Chicken Nuggets', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307180.jpg??width=400', price: '1.20' },
            { name: 'Orleans Roasted Wings', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307184.jpg??width=400', price: '2' },
        ],
        'Beverage': [
            { name: 'Coca-Cola', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307185.jpg??width=400', price: '0.80' },
        ],
        'Beer': [
            { name: 'Cambodia Beer', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307186.jpg??width=400', price: '1.20' },
        ],
    }

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className={`flex flex-col min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white `}>
                {/* Hero Section */}
                <div className="relative flex justify-center items-center h-[500px] mx-4 sm:mx-8 md:mx-16 lg:mx-36 xl:mx-48 rounded-lg my-4"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${menuBackground})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h1 className="text-4xl font-bold text-white mb-2">New York Beef Burger (Tonle Basak)</h1>
                        <div className="flex items-center text-white">
                            <MapPin className="h-5 w-5 mr-2" />
                            <p>St. 308, Sangkat Tonle Bassac, Khan Chamkar Mon, Phnom Penh</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
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

                {/* Menu Content */}
                <main className="container mx-auto px-4 py-8">
                    <Element name="Popular">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6">Popular</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {popular.map((popular) => (
                                    <div
                                        key={popular.name}
                                        className={`flex items-center space-x-4 p-4 border rounded-lg dark:border-[#947198] dark:bg-transparent border-gray-400 bg-white`}>
                                        <div className="relative h-24 w-24 flex-shrink-0">
                                            <img
                                                src={popular.image}
                                                alt={popular.name}
                                                className="object-cover rounded-lg h-full w-full"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-lg">{popular.name}</h3>
                                            <div className="text-[#764ab3] dark:text-[#d3a1d9] font-semibold">
                                                $ {popular.price}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </Element>

                    {Object.entries(otherSections).map(([sectionName, items]) => (
                        <Element key={sectionName} name={sectionName}>
                            <section className="mb-12">
                                <h2 className="text-2xl font-bold mb-6">{sectionName}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.name}
                                            className={`flex items-center space-x-4 p-4 border rounded-lg dark:border-[#947198] dark:bg-transparent border-gray-400 bg-white`}>
                                            <div className="relative h-24 w-24 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="object-cover rounded-lg h-full w-full"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-medium text-lg">{item.name}</h3>
                                                <div className="text-[#764ab3] dark:text-[#d3a1d9] font-semibold">
                                                    $ {item.price}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </Element>
                    ))}
                </main>

                <footer className={`py-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <div className="container mx-auto px-4 text-center">
                        <p>&copy; 2024 Colonnade Atrium. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Menu