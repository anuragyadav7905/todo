import { twMerge } from 'tailwind-merge'

interface BadgeProps {
    label: string
    color?: 'blue' | 'purple' | 'pink' | 'green' | 'gray' | 'orange' | 'red'
    className?: string
}

export function Badge({ label, color = 'blue', className }: BadgeProps) {
    const colors = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        orange: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        red: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
        gray: "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }

    return (
        <span className={twMerge(
            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
            colors[color],
            className
        )}>
            {label}
        </span>
    )
}
