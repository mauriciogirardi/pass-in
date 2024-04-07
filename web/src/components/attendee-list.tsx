import { formatDistance } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { useDebounce } from '../hooks/useDebounce'
import { getAttendees, GetAttendeesData } from '../services/getAttendees'
import { Checkbox } from './checkbox'
import { IconButton } from './icon-button'
import { InputSearch } from './input-search'
import { Pagination } from './pagination'
import { Skeleton } from './Skeleton'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

export function AttendeeList() {
  const [isLoading, setIsLoading] = useState(false)
  const [attendeePage, setAttendeePage] = useState<GetAttendeesData>()

  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    }
    return ''
  })

  const debouncedSearch = useDebounce(search, 300)

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  const amountPages = Math.ceil(attendeePage?.total || 0 / 10)

  const fetchingAttendees = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await getAttendees({
        eventId: '9e9bd979-9d10-4915-b339-3786b1634f33',
        pageIndex: String(page - 1),
        query: debouncedSearch,
      })

      setAttendeePage(response)
    } catch (error) {
      console.error('Error fetching attendeePage: ', error)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, page])

  useEffect(() => {
    fetchingAttendees()
  }, [fetchingAttendees])

  const setCurrentSearch = (value: string) => {
    const url = new URL(window.location.toString())
    url.searchParams.set('search', value)
    window.history.pushState({}, '', url)
    setSearch(value)
  }

  function handleChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setCurrentSearch(value)
    setPage(1)
  }

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString())
    url.searchParams.set('page', String(page))
    window.history.pushState({}, '', url)
    setPage(page)
  }

  return (
    <main className="space-y-4">
      <div className="flex items-center gap-5">
        <h1 className="font-bold text-2xl">Participantes</h1>
        <InputSearch
          placeholder="Buscar participantes..."
          onChange={handleChangeSearch}
          value={search}
          isClear={search.length > 0}
          onClear={() => {
            const url = new URL(window.location.toString())
            url.searchParams.set('search', '')
            window.history.pushState({}, '', url)
            setSearch('')
          }}
        />
      </div>

      <Table>
        <thead>
          <TableRow>
            <TableHeader style={{ width: 48 }}>
              <Checkbox />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 40 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: 10 }).map((_, i) => (
              <TableRow className="hover:bg-white/5" key={i}>
                <TableCell>
                  <Skeleton className="size-4 border border-white/10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-16 h-5" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Skeleton className="w-60 h-5" />
                    <Skeleton className="w-48 h-3" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="w-28 h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-28 h-5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="size-7" />
                </TableCell>
              </TableRow>
            ))}

          {!isLoading &&
            attendeePage?.attendees.map(
              ({ name, checkedInAt, createdAt, email, id }) => (
                <TableRow className="hover:bg-white/5" key={id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{name}</span>
                      <span className="text-xs text-zinc-400">{email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {formatDistance(new Date(createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell>
                    {checkedInAt === null ? (
                      <span className="text-zinc-500">Não fez check-in</span>
                    ) : (
                      formatDistance(new Date(checkedInAt), new Date(), {
                        addSuffix: true,
                      })
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendeePage?.attendees.length} de{' '}
              {attendeePage?.total} items
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <Pagination
                amountPage={amountPages}
                page={page}
                goToFirstPage={() => setCurrentPage(1)}
                goToPreviewPage={() => setCurrentPage(page - 1)}
                goToNextPage={() => setCurrentPage(page + 1)}
                goToLastPage={() => setCurrentPage(amountPages)}
              />
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </main>
  )
}
