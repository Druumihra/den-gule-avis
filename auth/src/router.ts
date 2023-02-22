import { Request, Response, Router } from "express"
import { Database } from "./Database";
import { inject } from "./inject";
import { generateToken } from "./generateToken";

export const routing = Router()

interface LoginRequest {
    username?: string,
    password?: string,
}

interface RegisterRequest {
    username?: string,
    password?: string,
}

const basedDb = {} as Database;

routing.post('/login', inject(basedDb, async(req: Request, res: Response, db: Database) =>{
    const body: LoginRequest = req.body;
    if (body.username === "" 
    || body.password === "" 
    || body.username === undefined 
    || body.password === undefined) {
        res.status(400).json({error: 'Invalid username or password'})
        return;
    }

    const user = await db.userFromName(body.username)
    if (user === null){
        res.status(500).json({error: 'server error'})
        return;    
    }
    const token = generateToken(64)
    await db.addSession({userId: user.id, token: token})
}))


routing.post('/register', inject(basedDb, async(req: Request, res: Response, db: Database) => {
    const body: RegisterRequest = req.body
    
    if (!body.username) {
        res.status(400).json({error: 'Invalid username'})
        return;
    }
    if (!body.password) {
        res.status(400).json({error: 'Invalid Password'})
        return;
    }
    await db.addUser({name: body.username, password: body.password})
    res.status(200).json({message: 'Success'})
    
}))

routing.get('/tokenToUser/:token', inject(basedDb, async(req: Request, res: Response, db: Database) => {
    
    const session = await db.sessionFromToken(req.params.token)
    if (session === null) {
        res.status(400).json({error: "Invalid session token"})
        return;
    } 
    const user = await db.userFromId(session.userId)
    if (user === null) {
        res.status(500).json({error: "server error"})
        return;
    }
    res.status(200).json({message: "success", user:{id: user.id, username: user.name}})
}))

routing.post('/logout/:token', inject(basedDb, async(req: Request, res: Response, db: Database) => {
    const session = await db.sessionFromToken(req.params.token) 
    if (session === null) {
        res.status(400).json({error: "Invalid session token"})
        return;
    } 
    const user = await db.userFromId(session.userId)
    if (user === null) {
        res.status(500).json({error: "server error"})
        return;
    }
    await db.deleteSession({userId: user.id, token: req.params.token})
    res.status(200).json({message: "success"})

}))
