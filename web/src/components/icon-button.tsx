import { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  transparent?: boolean
}

export function IconButton({ transparent = false, ...props }: IconButtonProps) {
  return (
    <button
      className={twMerge(
        'cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
        transparent
          ? 'bg-black/20 border border-white/10 rounded-md p-1.5 enabled:hover:bg-white/10'
          : 'bg-white/10 border border-white/10 rounded-md p-1.5 enabled:hover:bg-white/20',
      )}
      {...props}
    />
  )
}
