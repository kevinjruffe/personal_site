import type { Entry } from "./contentful";

export type PaginationTools = {
  changePage: (change?: number) => void;
  entriesPerPage: number;
  entriesToShow: Array<Entry>;
  isFirstPage: boolean;
  isLastPage: boolean;
};
