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
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await new Promise<boolean>(resolve => setTimeout(() => resolve(false), 1000));
            setIsAuthenticated(authStatus);
        };
        checkAuth();

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.matches) {
            setDarkMode(false);
        }
        darkModeMediaQuery.addEventListener('change', e => setDarkMode(e.matches));
    }, []);

    const handleLogin = (provider: 'github' | 'google') => {
        console.log(`Logging in with ${provider}`);
        setIsAuthenticated(true);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
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
