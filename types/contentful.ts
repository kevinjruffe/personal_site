export type ContentfulEntry = {
  title: string;
  slug: string;
  date: string;
  body: string;
  coordinates: Location;
  tagsCollection: any;
};

export type Entry = {
  title: string;
  slug: string;
  date: string;
  body: string;
  coordinates: Location;
  tags: Array<Tag>;
};

export type ImgDimensions = {
  fileName: string;
  height: number;
  width: number;
};

export type Location = {
  lat: number;
  lon: number;
};

export type Tag = {
  name: string;
};
