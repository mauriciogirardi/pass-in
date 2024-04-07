import iconSvg from '../assets/icon.svg'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex items-center gap-5 py-2">
      <img src={iconSvg} alt="" />

      <nav className="space-x-5">
        <NavLink>Eventos</NavLink>
        <NavLink>Participantes</NavLink>
      </nav>
    </header>
  )
}
