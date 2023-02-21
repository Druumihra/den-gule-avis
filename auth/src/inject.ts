import { Request, Response } from "express";
import { Database } from "./Database";

export type RequestHandler = (request: Request, response: Response, db: Database) => void;

export function inject(db: Database, func: RequestHandler) {
    return (request: Request, response: Response) => {
        func(request, response, db);
    }
}

