import { Request, Response, Router } from "express";
import { Database } from "./Database";
import { inject } from "./inject";
import { generateToken } from "./generateToken";

interface LoginRequest {
  username?: string;
  password?: string;
}

interface RegisterRequest {
  username?: string;
  password?: string;
}

export function routing(db: Database) {
  const router = Router();
  router.post("/login", inject(db, login));
  router.post("/register", inject(db, register));
  router.get("/tokenToUser/:token", inject(db, tokenToUser));
  router.get("/idToUser/", inject(db, idToUser));
  router.post("/logout/", inject(db, logout));
  return router;
}

async function login(req: Request, res: Response, db: Database) {
  const body: LoginRequest = req.body;
  if (!body.username || !body.password) {
    return res.status(400).json({ message: "Invalid login" });
  }

  const user = await db.userFromName(body.username);
  if (!user) {
    return res.status(400).json({ message: "Invalid login" });
  }

  const token = generateToken(64);
  const result = await db.addSession({ userId: user.id, token: token });
  if (!result) {
    return res.status(500).json({ message: "Server error" });
  }

  res.cookie("token", token, {
    maxAge: 7200000,
    httpOnly: false,
    sameSite: "lax",
  });
  return res.status(200).json({ message: "Success" });
}

async function register(req: Request, res: Response, db: Database) {
  const body: RegisterRequest = req.body;

  if (!body.username) {
    return res.status(400).json({ message: "Invalid username" });
  }
  if (!body.password) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const added = await db.addUser({
    name: body.username,
    password: body.password,
  });
  if (added) {
    return res.status(200).json({ message: "Success" });
  }
  return res.status(500).json({ message: "nej no" });
}

async function tokenToUser(req: Request, res: Response, db: Database) {
  const session = await db.sessionFromToken(req.params.token);
  if (session === null) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const user = await db.userFromId(session.userId);
  if (user === null) {
    return res.status(400).json({ message: "Invalid token" });
  }
  return res
    .status(200)
    .json({ message: "Success", user: { id: user.id, username: user.name } });
}

async function idToUser(req: Request, res: Response, db: Database) {
  const user = await db.userFromId(req.body.id);
  if (user === null) {
    return res.status(400).json({ message: "Invalid user" });
  }
  return res.status(200).json({ username: user.name });
}
async function logout(req: Request, res: Response, db: Database) {
  const session = await db.sessionFromToken(req.body.token);
  if (session === null) {
    return res.status(400).json({ message: "Invalid session token" });
  }
  const user = await db.userFromId(session.userId);
  if (user === null) {
    return res.status(400).json({ message: "Invalid session token" });
  }
  await db.deleteSession({ userId: user.id, token: req.params.token });
  return res.status(200).json({ message: "Success" });
}
