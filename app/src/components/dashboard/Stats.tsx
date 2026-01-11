import { useTaskStore } from '../../store'

export function Stats() {
    const tasks = useTaskStore((state) => state.tasks)
    const setFilter = useTaskStore((state) => state.setFilter)

    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'completed').length
    const pending = total - completed
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

    return (
        <div className="grid grid-cols-4 divide-x divide-gray-700/50 bg-gray-800/40 rounded-xl border border-gray-700/50 p-4 mb-6 backdrop-blur-md">
            <div onClick={() => setFilter('all')} className="flex flex-col items-center px-4 cursor-pointer hover:bg-gray-700/30 rounded-lg transition-colors py-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total</span>
                <span className="text-lg font-bold text-white">{total}</span>
            </div>
            <div onClick={() => setFilter('pending')} className="flex flex-col items-center px-4 cursor-pointer hover:bg-gray-700/30 rounded-lg transition-colors py-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Pending</span>
                <span className="text-lg font-bold text-indigo-400">{pending}</span>
            </div>
            <div onClick={() => setFilter('completed')} className="flex flex-col items-center px-4 cursor-pointer hover:bg-gray-700/30 rounded-lg transition-colors py-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Done</span>
                <span className="text-lg font-bold text-emerald-400">{completed}</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Rate</span>
                <span className="text-lg font-bold text-blue-400">{progress}%</span>
            </div>
        </div>
    )
}
