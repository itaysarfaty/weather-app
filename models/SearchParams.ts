export type SearchParams = { [key: string]: string | string[] | undefined };

export interface CoordParams extends SearchParams {
  lat?: string;
  lon?: string;
}
