import { useTaskStore } from '../../store'
import { TaskItem } from './TaskItem'
import { AnimatePresence } from 'framer-motion'
import { Ghost } from 'lucide-react'

export function TaskList() {
    const { tasks, filter, sortBy, searchQuery } = useTaskStore()

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'all') return true
            if (filter === 'pending') return task.status === 'pending'
            if (filter === 'completed') return task.status === 'completed'
            return task.priority === filter
        })
        .filter((task) =>
            task.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'newest') return b.createdAt - a.createdAt
            if (sortBy === 'oldest') return a.createdAt - b.createdAt
            if (sortBy === 'priority') {
                const pOrder = { high: 3, medium: 2, low: 1 }
                return pOrder[b.priority] - pOrder[a.priority]
            }
            return 0
        })

    if (filteredTasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Ghost size={48} className="mb-4 opacity-50 animate-bounce" />
                <p>No tasks found in this sector.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3 w-full pb-20">
            <AnimatePresence mode='popLayout'>
                {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </AnimatePresence>
        </div>
    )
}
