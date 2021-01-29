import Article from "../components/Article";
import usePagination from "../hooks/usePagination";

export default function EntryCollection({ heading, entries }) {
  const {
    changePage,
    entriesPerPage,
    entriesToShow,
    isFirstPage,
    isLastPage,
  } = usePagination(entries);
  const buttonStyle =
    "text-white text-2xl px-8 py-2 mb-4 mx-16 rounded-md border border-solid border-black bg-green-light transition-opacity hover:opacity-75";

  return (
    <>
      <h1 className="pt-8 pb-1 text-green-light font-black text-base">
        {heading}
      </h1>
      {entriesToShow.map((entry) => (
        <Article borderTop={true} entry={entry} key={entry.slug} />
      ))}
      {entries.length > entriesPerPage && (
        <div className="flex justify-between">
          <button
            className={buttonStyle + (isFirstPage ? " invisible" : "")}
            onClick={() => changePage(-1)}
          >
            ◀
          </button>
          <button
            className={buttonStyle + (isLastPage ? " invisible" : "")}
            onClick={() => changePage()}
          >
            ▶
          </button>
        </div>
      )}
    </>
  );
}
