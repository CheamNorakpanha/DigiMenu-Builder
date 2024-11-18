import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Assuming you're using react-feather icons

interface BreadcrumbProps {
    isPublished: boolean;
    setIsPublishModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BannersBreadcrumb({ isPublished, setIsPublishModalOpen }: BreadcrumbProps) {
    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <nav className="flex items-center space-x-2 text-md text-gray-600 dark:text-white">
                    <Link to="/restaurant" className="hover:underline hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors">
                        Restaurant
                    </Link>
                    <span>/</span>
                    <Link to="/restaurant/dashboard-new-york-beef-burger" className="hover:underline hover:text-[#d3a1d9] dark:hover:text-[#947198] transition-colors">
                        New York Beef Burger (Tonle Basak)
                    </Link>
                    <span>/</span>
                    <span>Banners</span>
                </nav>
            </div>
            <button
                onClick={() => setIsPublishModalOpen(true)}
                className={`flex justify-between items-center ml-auto px-4 py-2 rounded-lg ${isPublished
                    ? 'bg-[#71389d] hover:bg-[#4f276d] dark:bg-[#9f6ea3] dark:hover:bg-[#624d66]'
                    : 'bg-[#b883e3]/75 hover:bg-[#9c6dae] dark:bg-[#d3a1d9] dark:hover:bg-[#947198]'
                    } text-white`}
            >
                <div className="flex items-center">
                    {isPublished ? <Eye className="mr-2 h-5 w-5" /> : <EyeOff className="mr-2 h-5 w-5" />}
                    {isPublished ? 'Published' : 'Not Published'}
                </div>
            </button>
        </div>
    );
}
