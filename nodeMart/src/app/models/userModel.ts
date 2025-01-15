export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    mobile: string;
    adress: string;
    role: string; 
}

export interface UserResponse {
    status: string;
    data: UserResponseData;
}

export interface UserResponseData {
    _id: string;
    id: number;
    name: string;
    email: string;
    password: string;
    mobile: string;
    adress: string;
    role: string; 
    __v: number;
}
