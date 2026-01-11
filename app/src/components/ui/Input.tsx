import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                ref={ref}
                className={twMerge(
                    "w-full bg-space-dark/50 border border-neon-blue/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] transition-all font-mono disabled:opacity-50",
                    error && "border-neon-pink focus:border-neon-pink focus:shadow-[0_0_10px_rgba(255,0,255,0.2)]",
                    className
                )}
                {...props}
            />
            {error && <span className="text-xs text-neon-pink mt-1 font-mono">{error}</span>}
        </div>
    )
})
