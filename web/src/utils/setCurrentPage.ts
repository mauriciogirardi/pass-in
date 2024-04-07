export const setCurrentPage = (page: number) => {
  const url = new URL(window.location.toString())
  url.searchParams.set('page', String(page))
  window.history.pushState({}, '', url)
}
