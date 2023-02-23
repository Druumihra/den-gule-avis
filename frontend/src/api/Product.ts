import { Comment } from "./Comment";

export interface Product {
    title: string,
    image: string,
    description: string,
    comments: Comment[],
}
