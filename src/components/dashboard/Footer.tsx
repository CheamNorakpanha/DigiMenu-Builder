import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="relative">
            <footer className="fixed inset-x-0 bottom-0 bg-white dark:bg-black text-white transition-colors duration-200">
                <div className="border-t border-gray-300 dark:border-[#d3a1d9] py-4 text-center">
                    <Link 
                        to="/home" 
                        className="text-sm text-gray-500 dark:text-[#d3a1d9] hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors"
                    >
                        © 2024 DigiMenu Builder. All rights reserved.
                    </Link>
                </div>
            </footer>
        </div>
    );
}