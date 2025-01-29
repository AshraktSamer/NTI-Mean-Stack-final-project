export interface registerPayload {
    name: string;
    email: string;
    password: string;
    mobile: string;
    adress: string;
    role?: string; 
}

export interface loginPayload {
    email: string,
    passowrd: string
}

export interface UserApiResponse <T> {
    Status?: string; 
    Data?: T;
    Token?: string
    Role?: string
    Msg?: string
    Error?: string
}



