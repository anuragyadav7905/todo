import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Check } from 'lucide-react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    checked: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, checked, ...props }, ref) => {
    return (
        <div className="relative flex items-center justify-center w-5 h-5">
            <input
                type="checkbox"
                ref={ref}
                checked={checked}
                className="peer appearance-none w-5 h-5 border border-neon-blue/50 rounded bg-space-dark/50 checked:bg-neon-blue checked:border-neon-blue cursor-pointer transition-all"
                {...props}
            />
            <Check
                size={14}
                className={twMerge(
                    "absolute text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity",
                    className
                )}
            />
        </div>
    )
})
