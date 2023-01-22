import { Edit, Person } from "@mui/icons-material";
import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import CommentAPI from "../api/CommentAPI";
import { useAuth } from "../services/AuthContext";
import { Comment } from "../types/DataModels";
import DeleteModal from "./DeleteModal";
import CommentForm from "./forms/CommentForm";

function CommentItem(props: { comment: Comment }) {
    const auth = useAuth();

    const [editing, setEditing] = useState<boolean>(false);
    const isEdited = props.comment.CreatedAt !== props.comment.UpdatedAt;

    // Format date string
    const dateObj = new Date(props.comment.CreatedAt);
    let createDate = dateObj.toLocaleDateString("en-GB", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: "numeric",
        minute: "numeric",
    })

    // Click handlers
    const handleEdit: MouseEventHandler = (e) => {
        setEditing(!editing);
    }

    const handleDelete = () => {
        CommentAPI.deleteComment(props.comment.ThreadID, props.comment.ID)
            .then(() => window.location.reload())
            .catch(err => alert(err));
    }

    return (
        <Card key={props.comment.ID}>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction='row' justifyContent="space-between" alignItems="center">
                        <Stack direction='row' spacing={1}>
                            <Person />
                            <Typography variant="body1">{props.comment.UserID} at {createDate}</Typography>
                            {
                                isEdited &&
                                <>
                                    <Divider flexItem orientation="vertical" variant="middle" light />
                                    <Typography variant="body1">edited</Typography>
                                </>
                            }
                        </Stack>
                        {
                            auth.user === props.comment.UserID &&
                            <Stack direction="row" spacing={0.5}>
                                <Button 
                                    variant="text" 
                                    size="small" 
                                    startIcon={<Edit />} 
                                    onClick={handleEdit}>Edit</Button>
                                <DeleteModal fn={handleDelete}/>
                            </Stack>
                        }
                    </Stack>
                    {
                        editing
                            ? <CommentForm threadId={props.comment.ThreadID} comment={props.comment} />
                            : <Typography variant="body1">{props.comment.Content}</Typography>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}

export default CommentItem;