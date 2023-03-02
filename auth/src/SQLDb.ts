import { Database, Identifiable, Session, User } from "./Database";


const mysql = require('mysql2')


const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    Db: process.env.DB
})

export class SQLDb implements Database {
    public async addUser(user: User): Promise<boolean> {
        try {
            await connection.query("INSERT INTO Users (Name, Password) VALUES (?, ?)", user.name, user.password) 
         return true;
        }
         catch{
         return false;
        }
    }
    public async sessionFromToken(token: string): Promise<Session | null> {
        try {
            const res = await connection.query("SELECT * FROM Sessions WHERE Token = ?", token)
            return res;
        }
        catch {
            return null;
        }
    }
    public async userFromId(id: string): Promise<(User & Identifiable) | null> {
        try {
            const res = await connection.query("SELECT Name, Password FROM Users WHERE Id = ?", id)
            return res;
        }
        catch {
            return null;
        }
    }
    public async addSession(session: Session): Promise<boolean> {
        try {
            await connection.query("INSERT INTO Sessions (Token, User_Id) VALUES (?,?)", session.token, session.userId)
            return true;
        }
        catch {
            return false;
        }
    }
    public async userFromName(name: string): Promise<(User & Identifiable) | null> {
        try {
            const res = await connection.query("SELECT * FROM Users WHERE Name = ?", name)
            return res;
        }  
        catch {
            return null;
        }
    }
    public async deleteSession(session: Session): Promise<boolean> {
        try {
            await connection.query("DELETE * FROM Sessions WHERE Token = ?", session.token)
            return true;
        }
        catch {
            return false;
        }
    }
}

