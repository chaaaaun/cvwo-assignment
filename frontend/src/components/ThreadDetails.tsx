import { ArrowBack, Edit, Person, ThumbUp } from "@mui/icons-material";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { threadId } from "worker_threads";
import { useAuth } from "../services/AuthContext";
import { Thread } from "../types/DataModels";
import CommentForm from "./forms/CommentForm";
import TagList from "./TagList";

function ThreadDetails(props: { thread: Thread }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const dateObj = new Date(props.thread.CreatedAt)
    props.thread.CreatedAt = dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="text" startIcon={<ArrowBack />} sx={{ alignSelf: "start" }} onClick={() => navigate(-1)}>Go Back</Button>
                        { auth.user === props.thread.UserID && 
                            <Button variant="text" startIcon={<Edit />} sx={{ alignSelf: "end" }}>Edit Thread</Button>
                        }
                    </Stack>
                    <TagList tags={props.thread.Tags} size="medium" />
                    <Typography variant="h3">{props.thread.Title}</Typography>
                    <Typography variant="body1">{props.thread.Content}</Typography>
                    <Stack direction='row' justifyContent='space-between' spacing={0.5} marginBottom={3}>
                        <Button variant="contained" startIcon={<ThumbUp />} sx={{ alignSelf: "end" }}>Like</Button>
                        <Stack spacing={0} alignItems='end'>
                            <Chip variant='outlined' sx={{ border: "none" }} icon={<Person />} label={props.thread.UserID} />
                            <Chip variant='outlined' sx={{ border: "none" }} label={"Created " + props.thread.CreatedAt} />
                        </Stack>
                    </Stack>
                    <CommentForm threadId={props.thread.ID}/>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ThreadDetails;