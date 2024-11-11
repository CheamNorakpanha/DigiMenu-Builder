import { useState, useEffect } from 'react';
import Navbar from '../components/home/Navbar';
import WelcomeSection from '../components/home/WelcomeSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import SeeItInActionSection from '../components/home/SeeItInActionSection';
import WhyDigiMenuBuilderSection from '../components/home/WhyDigiMenuBuilderSection';
import PricingSection from '../components/home/PricingSection';
import ContactSection from '../components/home/ContactSection';
import Footer from '../components/home/Footer';

export default function Home() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize with localStorage preference or default to light mode
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await new Promise<boolean>(resolve => setTimeout(() => resolve(false), 1000));
            setIsAuthenticated(authStatus);
        };
        checkAuth();

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

    const handleLogin = (provider: 'github' | 'google') => {
        console.log(`Logging in with ${provider}`);
        setIsAuthenticated(true);
    };

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="flex flex-col min-h-screen">

                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                <main className="flex-1">
                    <WelcomeSection isAuthenticated={isAuthenticated} handleLogin={handleLogin} />
                    <HowItWorksSection />
                    <SeeItInActionSection />
                    <WhyDigiMenuBuilderSection />
                    <PricingSection />
                    <ContactSection />
                </main>

                <Footer />
            </div>
        </div>
    );
}
