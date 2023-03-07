import { PrismaClient } from "@prisma/client";
import { Database, Identifiable, Session, User } from "./Database";
import { generateToken } from "./generateToken";

export class ORMDb implements Database {

  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL! } } });
  }

  public async addUser(user: User): Promise<boolean> {
    try {
      await this.prisma.users.create({
        data: {
          id: generateToken(64),
          name: user.name,
          password: user.password,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public async sessionFromToken(token: string): Promise<Session | null> {
    try {
      const res = await this.prisma.sessions.findFirst({
        where: {
          token: token,
        },
      });
      return res;
    } catch {
      return null;
    }
  }
  public async userFromId(id: string): Promise<(User & Identifiable) | null> {
    try {
      const res = await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  public async addSession(session: Session): Promise<boolean> {
    try {
      await this.prisma.sessions.create({
        data: {
          id: generateToken(64),
          token: session.token,
          userId: session.userId,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  public async userFromName(
    name: string
  ): Promise<(User & Identifiable) | null> {
    try {
      const res = await this.prisma.users.findFirst({
        where: {
          name: {
            equals: name,
          },
        },
        select: {
          name: true,
          password: true,
          id: true,
        },
      });
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  public async deleteSession(session: Session): Promise<boolean> {
    try {
      const idResult: Identifiable | null = await this.prisma.sessions.findFirst({
        where: {
          token: session.token,
        },
        select: {
          id: true,
        },
      });
      if (!idResult) {
        return false;
      }
      await this.prisma.sessions.delete({
        where: {
          id: idResult.id,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
