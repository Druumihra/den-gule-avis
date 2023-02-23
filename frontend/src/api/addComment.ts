import { Comment } from "./Comment";

export default async function addComment(postId: string, text: string): Promise<void> {
    if (postId === "abcdefg") {
        // @ts-ignore
        if (!window.globalVariablePostOneComments) {
            // @ts-ignore
            window.globalVariablePostOneComments = []
        }

        const comment: Comment = { text, user: "simon jakobsen from" };

        // @ts-ignore
        window.globalVariablePostOneComments.push(comment);
    } else {
        // @ts-ignore
        if (!window.globalVariablePostTwoComments) {
            // @ts-ignore
            window.globalVariablePostTwoComments = []
        }

        const comment: Comment = { text, user: "simon jakobsen from" };

        // @ts-ignore
        window.globalVariablePostTwoComments.push(comment);
    }
}
