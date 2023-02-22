
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
    public abstract sessionFromToken(token: string): Promise<Session | null>;
    public abstract userFromId(id: string): Promise<User & Identifiable>;
    public abstract addSession(session: Session): Promise<boolean>;
    public abstract userFromName(name: string): Promise<User & Identifiable | null>;
    public abstract deleteSession(session: Session): Promise<boolean> 
}
