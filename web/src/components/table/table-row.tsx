import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type TableRowProps = ComponentProps<'tr'>

export function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr {...props} className={twMerge('border-b border-white/10', className)} />
  )
}
