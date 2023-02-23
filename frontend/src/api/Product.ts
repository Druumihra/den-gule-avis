import { Comment } from "./Comment";

export interface Product {
    id: string,
    title: string,
    image: string,
    description: string,
    comments: Comment[],
}
