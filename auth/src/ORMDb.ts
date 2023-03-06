import { PrismaClient } from "@prisma/client";
import { parse } from "dotenv";
import { Database, Identifiable, Session, User } from "./Database";
import { generateToken } from "./generateToken";

const prisma = new PrismaClient();
export class ORMDb implements Database {
  public async addUser(user: User): Promise<boolean> {
    try {
      await prisma.users.create({
        data: {
          name: user.name,
          password: user.password,
          id: generateToken(64),
        },
      });
      return true;
    } catch {
      return false;
    }
  }
  public async sessionFromToken(token: string): Promise<Session | null> {
    try {
      const res = await prisma.sessions.findFirst({
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
      const res = await prisma.users.findUnique({
        where: {
          id: id,
        },
      });

      return res;
    } catch {
      return null;
    }
  }
  public async addSession(session: Session): Promise<boolean> {
    try {
      prisma.sessions.create({
        data: {
          id: generateToken(64),
          token: session.token,
          userId: session.userId,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
  public async userFromName(
    name: string,
  ): Promise<(User & Identifiable) | null> {
    try {
      const res = await prisma.users.findFirst({
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
    } catch {
      return null;
    }
  }
  public async deleteSession(session: Session): Promise<boolean> {
    try {
      const idResult: Identifiable | null = await prisma.sessions.findFirst({
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
      await prisma.sessions.delete({
        where: {
          id: idResult.id,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
