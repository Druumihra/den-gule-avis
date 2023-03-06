import { Database, Identifiable, Session, User } from "./Database";
import { generateToken } from "./generateToken";

function usernameTaken(user: User, users: User[]) {
  const doesNotExist = users.every((otherUser) => {
    return user.name !== otherUser.name;
  });

  return !doesNotExist;

}
export class BasedDb implements Database {
  private users: (User & Identifiable)[] = [];
  private sessions: Session[] = [];
  public async addUser(user: User): Promise<boolean> {
    if (usernameTaken(user, this.users)) {
      return false;
    }
    const id = generateToken(64);
    this.users.push({ ...user, id });
    return true;
  }
  public async sessionFromToken(token: string): Promise<Session | null> {
    const session = this.sessions.find((session) => {
      return session.token === token;
    });
    return session || null;
  }
  public async userFromId(id: string): Promise<(User & Identifiable) | null> {
    const user = this.users.find((user) => {
      return user.id === id;
    });
    return user || null;
  }
  public async addSession(session: Session): Promise<boolean> {
    this.sessions.push(session);
    return true;
  }
  public async userFromName(
    name: string
  ): Promise<(User & Identifiable) | null> {
    const user = this.users.find((user) => {
      return user.name === name;
    });
    return user || null;
  }
  public async deleteSession(session: Session): Promise<boolean> {
    const sessions = this.sessions.filter((othersession) => {
      return (
        session.token === othersession.token &&
        session.userId === othersession.userId
      );
    });
    this.sessions = sessions;
    return true;
  }
}
