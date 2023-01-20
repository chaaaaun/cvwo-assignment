import { Card, CardContent } from "@mui/material";
import { Comment } from "../types/DataModels";

function Comment(props: { comment: Comment }) {
    const dateObj = new Date(props.comment.UpdatedAt)
    props.comment.UpdatedAt = dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <Card>
            <CardContent>
                
            </CardContent>
        </Card>
    );
}

export default Comment;