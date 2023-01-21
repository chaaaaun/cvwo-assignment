import { Person, Visibility } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Comment } from "../types/DataModels";
import CommentItem from "./CommentItem";

function CommentList(props: { comments: Comment[] }) {
    const listItems = props.comments.map((comment) => {
        return (
            <CommentItem comment={comment} />
        )
    });
    return (
        <Stack spacing={1}>{listItems}</Stack>
    );
}

export default CommentList;