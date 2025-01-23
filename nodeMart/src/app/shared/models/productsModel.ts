export interface ProductResponse {
  status: string;
  Data: Product[];  
  pagination: PaginationInfo; 
}
export interface ProductPostResponse {
  status: string;
  Data: Product;  
  pagination: PaginationInfo; 
}

export interface Product {
  _id: string;  
  id: number; 
  name: string;
  category: { _id: string, name: string };
  subCategory: { _id: string, name: string };
  image: File;
  description: string;
  price: number;
  isInStock: boolean;
  isDeleted: boolean;
  isBestSeller: boolean;
  __v: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
}
