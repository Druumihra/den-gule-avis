import { Comment } from "../api/Comment";
import { useFetcher } from "react-router-dom";

interface Props {
    id: string,
    comments: Comment[],
}

function CommentField(props: Props) {

    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <>
            <h2>Kommentarfelt</h2>
            <Form method="post" action={`/product/${props.id}`}>
                <input type="text" name="text" />
                <button type="submit" className="button">Send</button>
            </Form>
            {
                props.comments.map((comment) =>
                    <div className="comment-block">
                        <h3>{comment.user}</h3>
                        <p>{comment.text}</p>
                    </div>
                )
            }
        </>
    );
}

export default CommentField;
