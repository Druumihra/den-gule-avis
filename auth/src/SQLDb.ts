import mysql, { Pool } from "mysql2/promise";
import {
  OkPacket,
  RowDataPacket,
} from "mysql2/typings/mysql/lib/protocol/packets";
import { Database, Identifiable, Session, User } from "./Database";

export class SQLDb implements Database {
  private connection: Pool;

  constructor() {
    try {
      this.connection = mysql.createPool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
      });
    } catch {
      console.error(`unable to connect to database: u@"${process.env.DB_USER}" p@"${process.env.DB_PASSWORD}" h@"${process.env.DB_HOST}" d@"${process.env.DB}"`)
      throw new Error("unable to connect");
    }
  }

  public async addUser(user: User): Promise<boolean> {
    try {
      await this.connection.query(
        "INSERT INTO users (name, password) VALUES (?, ?)",
        [user.name, user.password],
      );
      return true;
    } catch {
      return false;
    }
  }
  public async sessionFromToken(token: string): Promise<Session | null> {
    try {
      const [res] = await this.connection.query(
        "SELECT * FROM sessions WHERE token = ?",
        token,
      ) as RowDataPacket[];
      return res[0];
    } catch {
      return null;
    }
  }
  public async userFromId(id: string): Promise<(User & Identifiable) | null> {
    try {
      const [res] = await this.connection.query(
        "SELECT name, password FROM users WHERE id = ?",
        id,
      ) as RowDataPacket[];
      return res[0];
    } catch {
      return null;
    }
  }
  public async addSession(session: Session): Promise<boolean> {
    try {
      await this.connection.query(
        "INSERT INTO sessions (token, user_Id) VALUES (?, ?)",
        [session.token, session.userId],
      );
      return true;
    } catch {
      return false;
    }
  }
  public async userFromName(
    name: string,
  ): Promise<(User & Identifiable) | null> {
    try {
      const [res] = await this.connection.query(
        "SELECT * FROM users WHERE name = ?",
        [name],
      ) as RowDataPacket[];
      return res[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  public async deleteSession(session: Session): Promise<boolean> {
    try {
      await this.connection.query(
        "DELETE * FROM sessions WHERE token = ?",
        session.token,
      );
      return true;
    } catch {
      return false;
    }
  }
}
