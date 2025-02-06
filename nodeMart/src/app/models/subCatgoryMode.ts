export interface SubCategory {
    _id?: string; 
    id?: number; 
    name?: string; 
    categoryId?: string; 
    __v?: number; 
  }
  
  export interface SubCategoryResponse<T> {
    status: string;
    Data: T; 
  }