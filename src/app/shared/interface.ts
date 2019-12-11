export interface Watch {
    like: Array<string>;
    comments: Comment[];
    email: string;
    title: string;
    model: string;
    price: number;
    img?: string;
    id?: string
}

export interface Comment {
    email: string;
    text: string;
    cLike: Array<string>;
    dLike: Array<string>;
    id?: number
}

export interface Cart {
    email: string;
    title: string;
    model: string;
    watchId?: string;
    count: number;
    price: number;
    id?: number
}

export interface Order {
    userEmail: string;
    carts: Cart[];
    date: string,
    price: number
}

export interface User {
    name: string;
    email: string;
    password: string,
    id?: number
}