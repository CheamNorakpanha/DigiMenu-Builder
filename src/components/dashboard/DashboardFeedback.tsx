import { Star } from 'lucide-react'

export default function DashboardFeedback() {
    return (
        <div className={`rounded-lg bg-white dark:bg-black shadow-md overflow-hidden opacity-70 border border-gray-500 dark:border-[#947198]`}>
            <div className="p-6">
                <div className="flex justify-center mb-4">
                    <Star className={`h-12 w-12 dark:text-[#947198] text-zinc-800`} />
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Feedback (Coming Soon)</h3>
                <p className={`text-center text-gray-600 dark:text-gray-400`}>
                    View feedback received from your restaurant customers
                </p>
            </div>
        </div>
    )
}
