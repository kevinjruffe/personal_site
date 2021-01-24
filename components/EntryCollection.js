import Article from "../components/Article";

export default function EntryCollection({ heading, entries }) {
  return (
    <>
      <h1 className="pt-8 pb-1 text-green-light font-black text-base">
        {heading}
      </h1>
      {entries.map((entry) => (
        <Article borderTop={true} entry={entry} key={entry.slug} />
      ))}
    </>
  );
}
