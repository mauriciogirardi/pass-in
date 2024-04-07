import { Search, X } from 'lucide-react'
import { InputHTMLAttributes } from 'react'

type InputSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onClear?: () => void
  isClear?: boolean
}

export function InputSearch({ onClear, isClear, ...props }: InputSearchProps) {
  return (
    <div className="flex items-center w-96 gap-3 border border-white/10 focus-within:border-orange-400 rounded-lg px-3 py-1.5">
      <Search strokeWidth={1.5} className="size-4 text-emerald-300" />
      <input
        type="text"
        className="bg-transparent p-0 focus:ring-0 text-sm placeholder:text-zinc-500 flex-1 border-0"
        {...props}
      />
      {isClear && (
        <X
          onClick={onClear}
          className="size-4 text-zinc-400 hover:text-zinc-100 cursor-pointer"
          role="button"
          aria-label="Clear search input"
        />
      )}
    </div>
  )
}
