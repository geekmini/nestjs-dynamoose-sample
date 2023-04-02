export type Pagination<T> = {
  results: T[];
  limit: number;
  lastKey?: string;
};
