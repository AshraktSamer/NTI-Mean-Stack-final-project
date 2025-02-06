import { Catgory } from "./catgoryModel";
import { SubCategory } from "./subCatgoryMode";

export interface ProductResponse<T> {
  status?: string;
  Data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

export interface Product {
  _id: string;
  id?: number;
  name: string;
  category: Catgory;
  subCategory: SubCategory;
  image: File;
  description: string;
  price: number;
  quantity: number;
  isBestSeller: boolean;
  __v: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
}
