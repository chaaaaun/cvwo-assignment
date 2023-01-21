import { Button, TextField } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import CommentAPI from "../../api/CommentAPI";
import { useAuth } from "../../services/AuthContext";
import theme from "../../theme";
import { CommentRequest } from "../../types/ApiRequest";
import { Comment } from "../../types/DataModels";

export default function CommentForm(props: { threadId: string, comment?: Comment }) {
    const [content, setContent] = useState<string>(
        props.comment
            ? props.comment.Content
            : ""
    );
    const auth = useAuth();

    const onContentChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setContent(e.currentTarget.value);
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        if (!props.comment) {
            const comment: CommentRequest = {
                content: content
            }
            CommentAPI.createComment(comment, props.threadId).catch(err => console.error(err));
        } else {
            const comment: CommentRequest = {
                content: content
            }
            CommentAPI.updateComment(comment, props.threadId, props.comment.ID).catch(err => console.error(err));
        }
    }

    return (
        <form>
            <TextField fullWidth onChange={onContentChange}
                value={content}
                id="content-field"
                label="What are your thoughts?"
                multiline
                rows={4}
                margin="dense"
            />
            {
                auth.user
                    ? <Button onClick={handleSubmit} variant="contained" sx={{ marginY: theme.spacing(1) }}>Comment</Button>
                    : <Button variant="contained" disabled sx={{ marginY: theme.spacing(1) }}>Log In to Comment</Button>
            }

        </form>
    );
}