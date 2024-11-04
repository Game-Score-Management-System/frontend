import { useCallback, useState } from 'react';

export default function usePaginator(totalPages: number) {
  const [page, setPage] = useState(1);
  const [totalPagesState, setTotalPagesState] = useState(totalPages);

  // const pages = Math.ceil(elements.length / rowsPerPage);
  const pages = totalPagesState;

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return { page, pages, onNextPage, onPreviousPage, setPage, setTotalPagesState };
}

// export default function usePaginator<T>(elements: T[], rowsPerPage: number) {
//   const [page, setPage] = useState(1);

//   const pages = Math.ceil(elements.length / rowsPerPage);

//   const items = useMemo(() => {
//     const start = (page - 1) * rowsPerPage;
//     const end = start + rowsPerPage;

//     return elements.slice(start, end);
//   }, [page, elements, rowsPerPage]);

//   const onNextPage = useCallback(() => {
//     if (page < pages) {
//       setPage(page + 1);
//     }
//   }, [page, pages]);

//   const onPreviousPage = useCallback(() => {
//     if (page > 1) {
//       setPage(page - 1);
//     }
//   }, [page]);

//   return { itemsToShowInTable: items, page, pages, onNextPage, onPreviousPage, setPage };
// }
