import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { IconButton } from './icon-button'

type PaginationProps = {
  page: number
  amountPage: number
  goToNextPage: () => void
  goToPreviewPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}

export function Pagination({
  page,
  amountPage,
  goToNextPage,
  goToPreviewPage,
  goToFirstPage,
  goToLastPage,
}: PaginationProps) {
  return (
    <div className="inline-flex items-center gap-8">
      <span>
        Página {page} de {amountPage}
      </span>

      <div className="flex items-center gap-1.5">
        <IconButton onClick={goToFirstPage} disabled={page === 1}>
          <ChevronsLeft className="size-4" strokeWidth={1.5} />
        </IconButton>
        <IconButton onClick={goToPreviewPage} disabled={page === 1}>
          <ChevronLeft className="size-4" strokeWidth={1.5} />
        </IconButton>
        <IconButton onClick={goToNextPage} disabled={page === amountPage}>
          <ChevronRight className="size-4" strokeWidth={1.5} />
        </IconButton>
        <IconButton onClick={goToLastPage} disabled={page === amountPage}>
          <ChevronsRight className="size-4" strokeWidth={1.5} />
        </IconButton>
      </div>
    </div>
  )
}
