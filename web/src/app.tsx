import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { AttendeeList } from './components/attendee-list'
import { Header } from './components/header'

export function App() {
  setDefaultOptions({ locale: ptBR })

  return (
    <section className="max-w-7xl mx-auto py-5 space-y-5">
      <Header />
      <AttendeeList />
    </section>
  )
}
