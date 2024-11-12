import { BarChart3 } from 'lucide-react'

export default function DashboardStats() {
    return (
        <div className={`rounded-lg bg-white dark:bg-black shadow-md overflow-hidden opacity-70 border border-gray-500 dark:border-[#947198]`}>
            <div className="p-6">
                <div className="flex justify-center mb-4">
                    <BarChart3 className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Stats (Coming Soon)</h3>
                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                    Gain insights on how many people view your published menu and which items are most popular
                </p>
            </div>
        </div>
    )
}
