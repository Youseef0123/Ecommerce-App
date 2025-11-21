export interface Brands {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandsResponse {
  data: Brands[];
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  results: number;
}
