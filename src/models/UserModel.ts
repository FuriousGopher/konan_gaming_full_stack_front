export interface User {
    id: string;
    login: string;
    email: string;
    password: string;

    createdAt: string;
}

export type LoginData = Pick<User, 'login' | 'email' | 'password'>;