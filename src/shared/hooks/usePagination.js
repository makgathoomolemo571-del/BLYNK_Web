import { useState, useMemo } from "react";

export default function usePagination(data = [], pageSize = 20) {

  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / pageSize)
  );

  const paginatedData = useMemo(() => {

    const start = (page - 1) * pageSize;

    return data.slice(start, start + pageSize);

  }, [data, page, pageSize]);

  const next = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const previous = () => {
    if (page > 1) setPage(page - 1);
  };

  const goTo = (value) => {
    if (value >= 1 && value <= totalPages) {
      setPage(value);
    }
  };

  return {

    page,

    pageSize,

    totalPages,

    paginatedData,

    next,

    previous,

    goTo,

    setPage

  };

}