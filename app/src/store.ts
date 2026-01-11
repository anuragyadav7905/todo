import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'pending' | 'completed'

export interface Task {
    id: string
    text: string
    priority: Priority
    status: Status
    createdAt: number
    updatedAt?: number
}

interface TaskState {
    tasks: Task[]
    filter: 'all' | 'pending' | 'completed' | 'low' | 'medium' | 'high'
    sortBy: 'newest' | 'oldest' | 'priority'
    searchQuery: string

    // Actions
    addTask: (text: string, priority: Priority) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
    editTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
    clearCompleted: () => void

    // View Control
    setFilter: (filter: TaskState['filter']) => void
    setSort: (sort: TaskState['sortBy']) => void
    setSearch: (query: string) => void
}

export const PRIORITY_COLORS = {
    low: '#10b981',    // Emerald 500
    medium: '#f59e0b', // Amber 500
    high: '#ef4444',   // Rose 500
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            filter: 'pending',
            sortBy: 'newest',
            searchQuery: '',

            addTask: (text, priority) => set((state) => ({
                tasks: [{
                    id: Math.random().toString(36).substr(2, 9),
                    text,
                    priority,
                    status: 'pending',
                    createdAt: Date.now()
                }, ...state.tasks]
            })),

            toggleTask: (id) => set((state) => ({
                tasks: state.tasks.map((t) =>
                    t.id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending', updatedAt: Date.now() } : t
                )
            })),

            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id)
            })),

            editTask: (id, updates) => set((state) => ({
                tasks: state.tasks.map((t) => t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t)
            })),

            clearCompleted: () => set((state) => ({
                tasks: state.tasks.filter((t) => t.status !== 'completed')
            })),

            setFilter: (filter) => set({ filter }),
            setSort: (sortBy) => set({ sortBy }),
            setSearch: (searchQuery) => set({ searchQuery }),
        }),
        {
            name: 'antigravity-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)
