export interface ApiCatgoryResponse {
    status: string;
    Data: ApiCatgory[]; 
}
export interface ApiCatgory {
   _id: string;  
   id: number;
   name: string;
   __v: number;
 }
