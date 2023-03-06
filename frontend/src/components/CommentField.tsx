import { Comment } from "../api/Comment";
import { useFetcher } from "react-router-dom";

interface Props {
    id: string,
    comments: Comment[],
}

function ResponseText(success: boolean | undefined) {
    if (success === true) {
        return <p>Besked sendt</p>
    } else if (success === false) {
        return <p>Der opstod en fejl.</p>
    }
}

function CommentField(props: Props) {

    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <div className="comments">
            <b>Kommentarer</b>
            {ResponseText(fetcher.data)}
            <Form method="post" action={`/product/${props.id}`}>
                <textarea name="text" placeholder="Skriv en kommentar" required></textarea> 
                <button type="submit">Send</button>
            </Form>
            {
                props.comments.map((comment) =>
                    <div className="comment">
                        <span className="title">{comment.username}</span>
                        <br />
                        <span className="content">{comment.text}</span>
                    </div>
                )
            }
        </div>
    );
}

export default CommentField;
