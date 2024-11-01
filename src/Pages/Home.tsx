import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Phone, MapPin, SquareCheckBig, PenSquare, Share2, Zap, Palette, Smartphone, DollarSign, Building2, Sun, Moon } from "lucide-react";

export default function LandingPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    // import images
    const Restaurant1 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/94/b2/cherry-blossom-season.jpg?w=1000&h=-1&s=1';
    const Restaurant2 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/94/a0/cherry-blossom-season.jpg?w=1000&h=-1&s=1';
    const Restaurant3 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/9c/8c/ee/blossom-season.jpg?w=1000&h=-1&s=1';

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await new Promise<boolean>(resolve => setTimeout(() => resolve(false), 1000));
            setIsAuthenticated(authStatus);

        }
        checkAuth()

        // Check for user's preferred color scheme
        // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //     setDarkMode(true)
        // }

        // Check for user's preferred color scheme, but do not set dark mode by default
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false); // Only set dark mode if the user prefers it
        }

        // Listen for changes in color scheme preference
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            setDarkMode(e.matches)
        })
    }, [])

    const handleLogin = (provider: 'github' | 'google') => {
        console.log(`Logging in with ${provider}`)
        setIsAuthenticated(true)
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
            <header className="px-40 h-16 flex items-center border-b border-gray-200 dark:border-[#947198] bg-white dark:bg-black transition-colors duration-200">
                <Link className="flex items-center justify-center" to="#">
                    {/* A logo */}
                    <span className="ml-2 text-xl font-bold text-[#764ab3] dark:text-[#764ab3]">DigiMenu Builder</span>
                </Link>
                <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                    <Link className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9]" to="#how-it-works">
                        How It Works
                    </Link>
                    <Link className="text font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9]" to="#features">
                        Features
                    </Link>
                    <Link className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9]" to="#pricing">
                        Pricing
                    </Link>
                    <Link className="text-base font-medium text-gray-700 hover:text-[#71389d] dark:text-gray-200 dark:hover:text-[#d3a1d9]" to="#contact">
                        Contact
                    </Link>
                    <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-transparent dark:bg-transparent text-gray-500 dark:text-yellow-400 border border-gray-500">
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </nav>
            </header>

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 transition-colors duration-200"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(${Restaurant1})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div className="container px-4 md:px-6 mx-auto py-32">
                        <div className="flex flex-col items-center space-y-6 text-center">
                            <div className="space-y-2">
                                <h1 className="text-7xl font-bold tracking-tighter text-white dark:text-white pb-10">
                                    Welcome to <span className='text-[#3f238e] dark:text-[#d3a1d9] transition-colors'>DigiMenu Builder</span>
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-300 text-xl dark:text-gray-200 pb-4">
                                    Create stunning digital menus for your restaurant in minutes. Impress your customers with a modern,
                                    interactive dining experience.
                                </p>
                            </div>
                            <div className="space-y-4 w-full max-w-sm">
                                {isAuthenticated ? (
                                    <Link to="/dashboard" className="inline-flex w-full items-center justify-center rounded-md bg-[#35246c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#25194b] hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleLogin('github')}
                                            className="inline-flex w-full items-center justify-center rounded-md bg-[#35246c] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#25194b] dark:bg-[#35246c] dark:hover:bg-[#25194b]"
                                        >
                                            <Github className="mr-2 h-4 w-4" /> Login with GitHub
                                        </button>
                                        <button
                                            onClick={() => handleLogin('google')}
                                            className="inline-flex w-full items-center justify-center rounded-md bg-[#71389d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:bg-[#71389d] dark:text-white dark:hover:bg-[#4f276d]"
                                        >
                                            <Mail className="mr-2 h-4 w-4" /> Login with Google
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black transition-colors duration-200">
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                            How It Works
                        </h2>
                        <div className="flex justify-center">
                            <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                        </div>
                        <div className="grid gap-6 lg:grid-cols-4">
                            {[
                                { icon: Building2, title: "Step 1: Create Restaurant", description: "Create your own restaurant with basic details." },
                                { icon: PenSquare, title: "Step 2: Add Content", description: "Add menu-related content to your restaurant." },
                                { icon: Zap, title: "Step 3: Publish Restaurant", description: "Publish your restaurant to make it accessible to anyone." },
                                { icon: Share2, title: "Step 4: Share", description: "Share the generated QR code or menu URL with the world." }
                            ].map((step, index) => (
                                <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                                    <step.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-300">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 transition-colors duration-200"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Restaurant2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-white dark:text-white">
                            See It in Action
                        </h2>
                        <div className="flex flex-col items-center space-y-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code" width={200} height={200} className="rounded-lg shadow-md bg-white dark:bg-white" />
                            <p className="text-gray-300 dark:text-gray-300">Scan the QR code or click the button below to view a sample menu</p>
                            <button
                                className="inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#d3a1d9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#947198]"
                                onClick={() => window.open("https://menufic.com/restaurant/clel0b9zg0000mh08m5keb7h0/menu", "_blank")}
                            >
                                View Sample Menu
                            </button>
                        </div>
                    </div>
                </section>

                <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-200">
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                            Why DigiMenu Builder?
                        </h2>
                        <div className="flex justify-center">
                            <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                        </div>
                        <p className="text-center mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Build your restaurant's menu with ease. Our website has several awesome features that make it perfect to
                            take your restaurant's menu to the next level.
                        </p>
                        <div className="grid gap-8 lg:grid-cols-3">
                            {[
                                { icon: Zap, title: "Easy to Use", description: "Intuitive interface for quick menu creation and updates." },
                                { icon: Palette, title: "Customizable Design", description: "Tailor your menu's look to match your brand identity." },
                                { icon: Smartphone, title: "Mobile Responsive", description: "Your menu looks great on any device, from phones to tablets." }
                            ].map((feature, index) => (
                                <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-md dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                                    <feature.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-200"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Restaurant3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-white dark:text-white transition-colors">
                            Pricing
                        </h2>
                        <div className="flex justify-center">
                            <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-3">
                            {[
                                { icon: DollarSign, title: "Free", price: "$0/month", features: ["1 Restaurant", "Basic Customization", "QR Code Generation"], buttonText: "Get Started" },
                                { icon: DollarSign, title: "Pro", price: "$29.99/month", features: ["5 Restaurants", "Advanced Customization", "Analytics"], buttonText: "Contact Us" },
                                { icon: Building2, title: "Enterprise", price: "Custom/month", features: ["Unlimited Restaurants", "White-label Solution", "Dedicated Support"], buttonText: "Contact Us" }
                            ].map((plan, index) => (
                                <div key={index} className="backdrop-blur-sm flex flex-col p-6 bg-gray-50 rounded-lg shadow-lg dark:bg-transparent transition-colors duration-200 border border-gray-400 dark:border-[#d3a1d9]">
                                    <plan.icon className="w-12 h-12 mb-4 text-[#764ab3] dark:text-[#71389d]" />
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{plan.title}</h3>
                                    <p className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{plan.price}</p>
                                    <ul className="mb-6 space-y-2 flex-grow">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                                                <SquareCheckBig className="mr-2 h-5 w-5 text-black dark:text-white" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="mt-auto inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#4f276d] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#371b4c] w-full">
                                        {plan.buttonText}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-black transition-colors duration-200">
                    <div className="container px-4 md:px-6 mx-auto">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4 text-gray-900 dark:text-white">
                            Get in Touch
                        </h2>
                        <div className="flex justify-center">
                            <span className='border-t-2 border-[#71389d] mb-8'>&emsp;&emsp;&emsp;</span>
                        </div>
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div>
                                <form className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                        <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                        <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white" placeholder="you@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                        <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-[#d3a1d9] dark:text-white" placeholder="Your message"></textarea>
                                    </div>
                                    <button type="submit" className="inline-flex items-center justify-center rounded-md bg-[#71389d] dark:bg-[#d3a1d9] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4f276d] dark:hover:bg-[#947198] w-full">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                            <div className="space-y-4 pt-5">
                                <div className="flex items-center space-x-2">
                                    <Mail className="w-6 h-6 text-[#71389d] dark:text-[#d3a1d9]" />
                                    <span className="text-gray-600 dark:text-gray-300">contact@digimenubuilder.com</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="w-6 h-6 text-[#71389d] dark:text-[#d3a1d9]" />
                                    <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-6 h-6 text-[#71389d] dark:text-[#d3a1d9]" />
                                    <span className="text-gray-600 dark:text-gray-300">123 Menu Street, Foodville, FL 12345</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full bg-gray-100 dark:bg-black text-white transition-colors duration-200">
                <div className="border-t border-gray-300 dark:border-[#d3a1d9] py-4 text-center ">
                    <Link to="/" className="text-sm text-gray-500 dark:text-[#d3a1d9] hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors">
                        © 2024 DigiMenu Builder. All rights reserved.
                    </Link>
                </div>
            </footer>
        </div>
    )
}