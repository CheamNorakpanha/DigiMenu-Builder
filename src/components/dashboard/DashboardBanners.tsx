import { Image as ImageIcon } from 'lucide-react'

export default function DashboardBanners() {
    return (
        <div className={`rounded-lg bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-zinc-900 shadow-md overflow-hidden transition-colors border border-gray-500 dark:border-[#947198]`}>
            <div className="p-6">
                <div className="flex justify-center mb-4">
                    <ImageIcon className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Banners</h3>
                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                    Manage banners that could be used to display promotional content in your restaurant menu
                </p>
            </div>
        </div>
    )
}
