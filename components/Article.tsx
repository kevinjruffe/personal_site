import type { Entry, Tag } from "../types/contentful";

import { Element } from "domhandler/lib/node";
import dayjs from "dayjs";
import H1 from "./H1";
import Image from "next/image";
import Link from "next/link";
import parse, { DOMNode, HTMLReactParserOptions } from "html-react-parser";

type Props = {
  borderTop?: boolean;
  entry: Entry;
};

const options: HTMLReactParserOptions = {
  /**
   * Custom replace function for `parse`.
   * This replaces the img tag with NextJS's Image component.
   * NOTE: To be valid HTML5 we need to replace the wrapping `p` tag from the
   *       CMS with `div` tags, because NextJS's Image component will add `div`
   *       tags around the `img` tag. A `div` tag cannot be a child of a `p`
   *       tag...
   */
  replace: (domNode: DOMNode) => {
    if ("name" in domNode && domNode.name === "p") {
      const childImage: any =
        "children" in domNode &&
        domNode.children.find(
          (child: DOMNode) => "name" in child && child.name === "img"
        );
      if (childImage) {
        return (
          <div>
            <Image
              src={childImage.attribs.src}
              alt={childImage.attribs.alt}
              width={childImage.attribs.width}
              height={childImage.attribs.height}
              layout="responsive"
            />
          </div>
        );
      }
    }
  },
};

export default function Article({ borderTop, entry }: Props) {
  const topBorder = borderTop
    ? "border-t-4 border-double border-green-light "
    : "";

  const mapsUrl = entry.coordinates
    ? "https://www.google.com/maps/" +
      "@?api=1&map_action=map&basemap=satellite" +
      `&center=${entry.coordinates.lat},${entry.coordinates.lon}`
    : null;

  return (
    <article className={`${topBorder}pb-8`}>
      <H1>
        <Link href={`/entry/${entry.slug}`}>
          <a>{entry.title}</a>
        </Link>
      </H1>
      <div className="pb-4">
        <time dateTime={entry.date}>
          {dayjs(entry.date).format("MMMM D, YYYY")}
        </time>
        {mapsUrl && (
          <span>
            {" | "}
            <a
              target="_blank"
              rel="noreferrer"
              href={mapsUrl}
              className="text-green-light hover:underline"
            >
              {entry.coordinates.lat}, {entry.coordinates.lon}
            </a>
          </span>
        )}
      </div>
      {parse(entry.body, options)}
      {entry.tags.length > 0 && (
        <ul className="inline-block">
          {entry.tags.map((tag: Tag) => (
            <li key={tag.name} className="inline-block pr-4">
              <Link href={`/tag/${tag.name}`}>
                <a className="text-green-light hover:underline">🏷 {tag.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
