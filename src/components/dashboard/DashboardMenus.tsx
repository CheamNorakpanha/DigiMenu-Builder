import { Utensils } from 'lucide-react'

export default function DashboardMenu() {
    return (
        <div className={`rounded-lg bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-zinc-900 shadow-md overflow-hidden transition-colors border border-gray-500 dark:border-[#947198]`}>
            <div className="p-6">
                <div className="flex justify-center mb-4">
                    <Utensils className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Menus</h3>
                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                    Manage the menus, categories and individual menu items of your restaurant
                </p>
            </div>
        </div>
    )
}
