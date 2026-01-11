import { useTaskStore, Priority } from './store'
import { useState } from 'react'
import { Plus, Search, Trash2, Rocket } from 'lucide-react'
import { Input } from './components/ui/Input'
import { Button } from './components/ui/Button'
import { TaskList } from './components/dashboard/TaskList'
import { Stats } from './components/dashboard/Stats'

export function UI() {
    const addTask = useTaskStore((state) => state.addTask)
    const setSearch = useTaskStore((state) => state.setSearch)
    const setFilter = useTaskStore((state) => state.setFilter)
    const setSort = useTaskStore((state) => state.setSort)
    const clearCompleted = useTaskStore((state) => state.clearCompleted)

    const [text, setText] = useState('')
    const [priority, setPriority] = useState<Priority>('medium')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return
        addTask(text, priority)
        setText('')
    }

    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4 z-10 overflow-hidden">
            <div className="pointer-events-auto w-full max-w-2xl bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <header className="px-6 py-5 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/50">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-400">
                            <Rocket size={20} />
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">To Do</h1>
                    </div>
                    <Button variant="ghost" onClick={clearCompleted} size="sm" className="text-xs hover:bg-gray-800">
                        <Trash2 size={14} /> Clear Done
                    </Button>
                </header>

                <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
                    <Stats />

                    {/* Add Task */}
                    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
                        <div className="flex-1 relative">
                            <Input
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Add a new mission objective..."
                                className="w-full bg-gray-800/50 border-gray-700 focus:border-indigo-500 h-12 text-base pl-4 pr-32 rounded-xl transition-all shadow-inner"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as Priority)}
                                    className="bg-gray-700/50 border-none text-xs rounded-lg px-2 py-1.5 text-gray-300 font-medium cursor-pointer hover:bg-gray-700 transition-colors focus:ring-0 outline-none appearance-none"
                                    style={{ textAlignLast: 'center' }}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <Button type="submit" variant="primary" className="h-12 w-12 rounded-xl flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 border-none text-white transition-transform active:scale-95">
                            <Plus size={24} />
                        </Button>
                    </form>

                    {/* Filters & Search */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <Input
                                placeholder="Search tasks..."
                                className="pl-9 py-2 h-9 text-sm bg-gray-800/30 border-gray-700/50 focus:bg-gray-800/50 rounded-lg"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                            <select
                                className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-indigo-200 font-medium outline-none focus:border-indigo-500 transition-all cursor-pointer hover:bg-indigo-900/40"
                                onChange={(e) => setFilter(e.target.value as any)}
                            >
                                <option value="all" className="bg-gray-900 text-gray-300">All Tasks</option>
                                <option value="pending" className="bg-gray-900 text-gray-300">Pending</option>
                                <option value="completed" className="bg-gray-900 text-gray-300">Completed</option>
                                <option value="high" className="bg-gray-900 text-gray-300">High Priority</option>
                                <option value="medium" className="bg-gray-900 text-gray-300">Medium Priority</option>
                                <option value="low" className="bg-gray-900 text-gray-300">Low Priority</option>
                            </select>

                            <select
                                className="bg-indigo-950/30 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-indigo-200 font-medium outline-none focus:border-indigo-500 transition-all cursor-pointer hover:bg-indigo-900/40"
                                onChange={(e) => setSort(e.target.value as any)}
                            >
                                <option value="newest" className="bg-gray-900 text-gray-300">Newest First</option>
                                <option value="oldest" className="bg-gray-900 text-gray-300">Oldest First</option>
                                <option value="priority" className="bg-gray-900 text-gray-300">Highest Priority</option>
                            </select>
                        </div>
                    </div>

                    <TaskList />
                </main>
            </div>
        </div>
    )
}
