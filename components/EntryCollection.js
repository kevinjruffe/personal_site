import Article from "../components/Article";
import usePagination from "../hooks/usePagination";

export default function EntryCollection({ heading, entries }) {
  const { changePage, entriesPerPage, entriesToShow } = usePagination(entries);
  const buttonStyle = "border border-solid border-green";

  return (
    <>
      <h1 className="pt-8 pb-1 text-green-light font-black text-base">
        {heading}
      </h1>
      {entriesToShow.map((entry) => (
        <Article borderTop={true} entry={entry} key={entry.slug} />
      ))}
      {entries.length > entriesPerPage && (
        <>
          <button className={buttonStyle} onClick={() => changePage(-1)}>
            Prior
          </button>
          <button onClick={() => changePage()}>Next</button>
        </>
      )}
    </>
  );
}
