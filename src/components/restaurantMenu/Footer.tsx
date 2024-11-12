import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-full bg-gray-100 dark:bg-black text-white transition-colors duration-200">
            <div className="border-t border-gray-300 dark:border-[#d3a1d9] py-4 text-center ">
                <Link to="/" className="text-sm text-gray-500 dark:text-[#d3a1d9] hover:text-[#764ab3] dark:hover:text-[#947198] transition-colors">
                    © 2024 DigiMenu Builder. All rights reserved.
                </Link>
            </div>
        </footer>
    )
}
