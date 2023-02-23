import { Comment } from "../api/Comment";

interface Props {
    comments: Comment[],
}

function CommentField(props: Props) {

    return (
        <>
            <h2>Kommentarfelt</h2>
            <input id="comment-input" /> <button>Send</button>
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
