export interface ApiSubCategory {
    _id: string; // MongoDB ID
    id: number; // Subcategory ID
    name: string; // Subcategory name
    categoryId: string; // ID of the category it belongs to
    __v?: number; // Optional version field
  }
  
  export interface ApiSubCategoryResponse {
    status: string; // Response status (e.g., "success")
    Data: ApiSubCategory[]; // Array of subcategories
  }