import { Plus } from 'lucide-react'; // Assuming you're using react-icons for the Plus icon

export default function AddBannerCard({ setIsAddBannerOpen }: { setIsAddBannerOpen: (open: boolean) => void }) {
    return (
        <div
            className="bg-white dark:bg-black rounded-lg border border-gray-500 dark:border-[#947198] p-8 flex flex-col items-center justify-center cursor-pointer aspect-[16/9] hover:shadow-md"
            onClick={() => setIsAddBannerOpen(true)}
        >
            <div className="w-12 h-12 rounded-full border border-gray-200 dark:border-white flex items-center justify-center mb-4">
                <Plus className="h-6 w-6 text-gray-400 dark:text-white" />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">Add new banner</h2>
            <p className="text-sm text-gray-500 text-center">
                Start creating a new restaurant menu by adding a new restaurant
            </p>
        </div>
    );
}
