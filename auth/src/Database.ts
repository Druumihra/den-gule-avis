export interface Identifiable {
    id: string,
}

export interface User {
    name: string,
    password: string,
}

export interface Session {
    userId: string,
    token: string,
}

export abstract class Database {
    public abstract addUser(user: User): Promise<boolean>;
    public abstract editUser(user: User & Identifiable): Promise<boolean>;
    public abstract sessionFromToken(token: string): Promise<Session>;
    public abstract userFromId(id: string): Promise<User & Identifiable>;
}
