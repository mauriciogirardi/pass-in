import { InputHTMLAttributes } from 'react'

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>

export function Checkbox({ ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className="size-4 mb-1 cursor-pointer rounded bg-white/10 border-white/10 focus:border-orange-500 focus:bg-white/10 text-orange-400 focus:ring-1 focus:ring-offset-2 focus:ring-orange-500"
      {...props}
    />
  )
}
