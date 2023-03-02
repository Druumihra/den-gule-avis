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
        <>
            <h2>Kommentarfelt</h2>
            {ResponseText(fetcher.data)}
            <Form method="post" action={`/product/${props.id}`}>
                <input type="text" name="text" />
                <button type="submit" className="button">Send</button>
            </Form>
            {
                props.comments.map((comment) =>
                    <div className="comment-block">
                        <h3>{comment.username}</h3>
                        <p>{comment.text}</p>
                    </div>
                )
            }
        </>
    );
}

export default CommentField;
