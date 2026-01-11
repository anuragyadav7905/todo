import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, Edit2, Check } from 'lucide-react'
import { Task, useTaskStore } from '../../store'
import { Badge } from '../ui/Badge'
import { Checkbox } from '../ui/Checkbox'
import { Button } from '../ui/Button'

interface TaskItemProps {
    task: Task
}

export function TaskItem({ task }: TaskItemProps) {
    const toggleTask = useTaskStore((state) => state.toggleTask)
    const deleteTask = useTaskStore((state) => state.deleteTask)
    const editTask = useTaskStore((state) => state.editTask)

    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(task.text)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const handleSave = () => {
        if (editValue.trim()) {
            editTask(task.id, { text: editValue })
            setIsEditing(false)
        }
    }

    const priorityColors = {
        low: 'green',
        medium: 'orange', // Changed from purple/pink
        high: 'red'
    } as const

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            className={`
        group flex items-center gap-4 p-4 rounded-xl transition-all border
        ${task.status === 'completed'
                    ? 'bg-gray-800/30 border-transparent opacity-60'
                    : 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/80'
                }
      `}
        >
            <Checkbox
                checked={task.status === 'completed'}
                onChange={() => toggleTask(task.id)}
            />

            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="flex gap-2">
                        <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            className="bg-gray-900 border border-indigo-500 rounded px-3 py-1.5 w-full text-white outline-none text-sm placeholder-gray-500 transition-all focus:ring-1 focus:ring-indigo-500"
                        />
                        <Button size="sm" variant="primary" onClick={handleSave} className="h-full aspect-square p-0 flex items-center justify-center"><Check size={14} /></Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <span className={`text-sm md:text-base font-medium truncate ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                            {task.text}
                        </span>
                        <Badge label={task.priority} color={priorityColors[task.priority]} />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {!deleteConfirm ? (
                    <>
                        <button onClick={() => setIsEditing(!isEditing)} className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-white/5 rounded-lg transition-all">
                            <Edit2 size={16} />
                        </button>
                        <button onClick={() => setDeleteConfirm(true)} className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-all">
                            <Trash2 size={16} />
                        </button>
                    </>
                ) : (
                    <div className="flex gap-2 items-center bg-gray-900/90 px-3 py-1 rounded-lg border border-rose-900/30">
                        <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wide">Sure?</span>
                        <button onClick={() => deleteTask(task.id)} className="text-rose-500 font-bold hover:text-rose-400 text-xs bg-rose-500/10 px-2 py-1 rounded">Yes</button>
                        <button onClick={() => setDeleteConfirm(false)} className="text-gray-400 hover:text-white text-xs px-2 py-1">No</button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}
