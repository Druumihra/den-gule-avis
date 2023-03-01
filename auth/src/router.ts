import { Request, Response, Router } from "express";
import { Database } from "./Database";
import { inject } from "./inject";
import { generateToken } from "./generateToken";
import { BasedDb } from "./BasedDb";
import { connection } from "./SQLDb";
export const routing = Router();

interface LoginRequest {
  username?: string;
  password?: string;
}

interface RegisterRequest {
  username?: string;
  password?: string;
}

const basedDb = new BasedDb();

routing.post(
  "/login",
  inject(basedDb, async (req: Request, res: Response, db: Database) => {
    const body: LoginRequest = req.body;
    if (!body.username || !body.password) {
      return res.status(400).json({ message: "Invalid login" });
    }

    const user = await db.userFromName(body.username);
    if (user === null) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const token = generateToken(64);
    await db.addSession({ userId: user.id, token: token });

    res.cookie("token", token, {
      maxAge: 7200000,
      httpOnly: false,
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Success" });
  })
);

routing.post(
  "/register",
  inject(basedDb, async (req: Request, res: Response, db: Database) => {
    const body: RegisterRequest = req.body;

    if (!body.username) {
      return res.status(400).json({ message: "Invalid username" });
    }
    if (!body.password) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    await db.addUser({ name: body.username, password: body.password });
    try {
       let SQLResult = await connection.query("INSERT INTO Users (Name, Password) VALUES (?, ?)", body.username, body.password) 
    }
    catch{
    
    }
    return res.status(200).json({ message: "Success" });
  })
);

routing.get(
  "/tokenToUser/:token",
  inject(basedDb, async (req: Request, res: Response, db: Database) => {
    const session = await db.sessionFromToken(req.params.token);
    if (session === null) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await db.userFromId(session.userId);
    if (user === null) {
      return res.status(500).json({ message: "Server error" });
    }
    try {
     let SQLResult = await connection.query("SELECT Name, id FROM USERS WHERE id = ?", session.userId) 
    }
    catch {
  
    }
    return res
      .status(200)
      .json({ message: "Success", user: { id: user.id, username: user.name } });
  })


);

routing.get(
    "/idToUser/",
    inject(basedDb, async (req: Request, res: Response, db: Database) => {
        const user = await db.userFromId(req.body.id);
        if (user === null) {
            return res.status(400).json({ message: "Invalid user"})
        }
        return res.status(200).json({ username: user.name});
    })  
)

routing.post(
  "/logout/",
  inject(basedDb, async (req: Request, res: Response, db: Database) => {
    const session = await db.sessionFromToken(req.body.token);
    if (session === null) {
      return res.status(400).json({ message: "Invalid session token" });
    }
    const user = await db.userFromId(session.userId);
    if (user === null) {
      return res.status(500).json({ message: "Server error" });
    }
    await db.deleteSession({ userId: user.id, token: req.params.token });
    return res.status(200).json({ message: "Success" });
  })
);
