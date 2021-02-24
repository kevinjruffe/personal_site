import type { Entry } from "../types/contentful";
import type { PaginationTools } from "../types/paginationTools";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * Hook for adding pagination to entry collections.
 */
export default function usePagination(entries: Array<Entry>): PaginationTools {
  const [currentEntry, setCurrentEntry] = useState(0);
  const entriesPerPage = 4;
  const router = useRouter();
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const pathWithoutQuery = router.asPath.replace(/[?]page=-*[0-9]+/, "");

  useEffect(() => {
    const page = Number(router.query.page);
    if (page > 1 && page <= totalPages) {
      setCurrentEntry(Math.max(page - entriesPerPage, entriesPerPage));
    } else if (page) {
      router.push(pathWithoutQuery);
    } else {
      setCurrentEntry(0);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });

  const entriesToShow = entries.slice(
    currentEntry,
    currentEntry + entriesPerPage
  );

  const changePage = (change = 1) => {
    const currentPage = Number(router.query.page ?? 1);
    if (currentPage + change <= totalPages && currentPage + change >= 1) {
      const page = Math.max(1, currentPage + change);
      router.push(
        page === 1 ? pathWithoutQuery : `${pathWithoutQuery}?page=${page}`
      );
    }
  };

  return {
    changePage,
    entriesPerPage,
    entriesToShow,
    isFirstPage: currentEntry === 0,
    isLastPage: totalPages === Number(router.query.page),
  };
}
