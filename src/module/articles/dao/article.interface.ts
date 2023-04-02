export interface ArticleItemKey {
  slug: string;
}
export interface ArticleItem {
  slug: string;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetArticleItem {
  slug: string;
}

export interface ICreateArticleItem {
  title: string;
  body: string;
}

export interface IGetArticleItems {
  lastKey?: string;
  limit: number;
  sortOrder: string;
  sortBy: string;
}
