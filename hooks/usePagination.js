import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function usePagination(entries) {
  const [currentEntry, setCurrentEntry] = useState(0);
  const entriesPerPage = 2;
  const router = useRouter();
  const totalPages = Math.ceil(entries.length / entriesPerPage);

  const pathWithoutQuery = router.asPath.replace(/[?]page=-*[0-9]+/, "");

  useEffect(() => {
    if (router.query.page > 1 && router.query.page <= totalPages) {
      setCurrentEntry(
        Math.max(router.query.page - entriesPerPage, entriesPerPage)
      );
    } else if (router.query.page) {
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
