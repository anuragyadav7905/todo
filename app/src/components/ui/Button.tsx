import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'primary',
    size = 'md',
    ...props
}, ref) => {
    const variants = {
        primary: "bg-neon-blue/10 border-neon-blue text-neon-blue hover:bg-neon-blue/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]",
        secondary: "bg-neon-purple/10 border-neon-purple text-neon-purple hover:bg-neon-purple/20 hover:shadow-[0_0_15px_rgba(157,0,255,0.3)]",
        danger: "bg-neon-pink/10 border-neon-pink text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
        ghost: "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
    }

    const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    }

    return (
        <button
            ref={ref}
            className={twMerge(
                "border rounded-lg font-mono transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider font-bold",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
})
