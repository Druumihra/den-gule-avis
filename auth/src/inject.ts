import { Database } from "./Database";

export type RequestHandler = (request: Request, response: Response, db: Database) => void;

export function inject(func: RequestHandler, db: Database) {
    return function(request: Request, response: Response) {
        func(request, response, db);
    }
}

