import { Button, TextField } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import ApiService from "../../services/ApiService";
import { useAuth } from "../../services/AuthContext";
import theme from "../../theme";
import { CommentRequest } from "../../types/ApiRequest";

export default function CommentForm(props: { threadId: string }) {
    const [content, setContent] = useState<string>("");
    const auth = useAuth();
    
    const onContentChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setContent(e.currentTarget.value);
    }
    
    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const comment: CommentRequest = {
            threadId: props.threadId,
            content: content
        }
        ApiService.createComment(comment).catch(err => console.error(err));
        
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