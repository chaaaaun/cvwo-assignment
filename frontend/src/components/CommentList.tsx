import { Person, Visibility } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router";
import { useAuth } from "../services/AuthContext";
import { Comment } from "../types/DataModels";

function CommentList(props: { comments: Comment[] }) {
    const navigate = useNavigate();
    const auth = useAuth();

    const listItems = props.comments.map((comment) => {
        console.log(comment.CreatedAt);
        console.log(comment.UpdatedAt);
        
        const isEdited = comment.CreatedAt !== comment.UpdatedAt;
        const dateObj = new Date(comment.CreatedAt);
        let createDate = dateObj.toLocaleDateString("en-GB", {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: "numeric",
            minute: "numeric",
        })
        return (
            <Card key={comment.ID}>
                <CardContent>
                    <Stack spacing={1}>
                        <Stack direction='row' justifyContent="space-between" alignItems="center">
                            <Stack direction='row' spacing={1}>
                                <Person />
                                <Typography variant="body1">{comment.UserID} at {createDate}</Typography>
                                {
                                isEdited &&
                                    <>
                                        <Divider flexItem orientation="vertical" variant="middle" light />
                                        <Typography variant="body1">edited</Typography>
                                    </>
                                }
                            </Stack>
                            {
                                auth.user === comment.UserID &&
                                    <Button variant="text" size="small">Edit</Button>
                            }
                        </Stack>
                        <Typography variant="body1">{comment.Content}</Typography>

                    </Stack>
                </CardContent>
            </Card>
        )
    });
    return (
        <Stack spacing={1}>{listItems}</Stack>
    );
}

export default CommentList;