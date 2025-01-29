export interface ApiSubCategory {
    _id: string; 
    id: number; 
    name: string; 
    categoryId: string; 
    __v?: number; 
  }
  
  export interface ApiSubCategoryResponse {
    status: string;
    Data: ApiSubCategory[]; 
  }