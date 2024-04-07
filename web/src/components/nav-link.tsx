import { AnchorHTMLAttributes } from 'react'

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: string
}

export function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <a
      className="font-medium text-sm hover:text-zinc-400 outline-none focus:text-emerald-300"
      {...props}
    >
      {children}
    </a>
  )
}
