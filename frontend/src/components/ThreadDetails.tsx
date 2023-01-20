import { AccessTimeFilled, Person, ThumbsUpDown, ThumbUp } from "@mui/icons-material";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { threadId } from "worker_threads";
import { Thread } from "../types/DataModels";
import TagList from "./TagList";

function ThreadDetails(props: { thread: Thread }) {
    const dateObj = new Date(props.thread.CreatedAt)
    props.thread.CreatedAt = dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <TagList tags={props.thread.Tags} size="medium" />
                    <Typography variant="h3">{props.thread.Title}</Typography>
                    <Typography variant="body1">{props.thread.Content}</Typography>
                    <Stack direction='row' justifyContent='space-between' spacing={0.5}>
                        <Button variant="contained" startIcon={<ThumbUp />}>Like</Button>
                        <Stack direction='row' spacing={0.5} alignItems='end'>
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<Person />} label={props.thread.UserID} />
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<AccessTimeFilled />} label={props.thread.CreatedAt} />
                                    </Stack>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ThreadDetails;