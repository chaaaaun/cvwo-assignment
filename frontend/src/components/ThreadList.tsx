import { AccessTime, AccessTimeFilled, Comment, Person, ThumbUp, Visibility } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Stack } from "@mui/system";
import { Thread } from "../types/DataModels";
import TagList from "./TagList";

function ThreadList(props: { threads: Thread[] }) {
    const listItems = props.threads.map((thread) => {
        const dateObj = new Date(thread.CreatedAt)
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = dateObj.toLocaleDateString("en-GB", options)
        return (
            <Card key={thread.ID}>
                <CardActionArea>
                    <CardContent>
                        <Grid2 container alignItems='center'>
                            <Grid2 lg={9}>
                                <Stack spacing={0.5}>
                                    <TagList tags={thread.Tags} />
                                    <Typography variant="h5" component="div">{thread.Title}</Typography>
                                    <Stack direction='row' spacing={0.5}>
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<Comment />} label={thread.Comments ? thread.Comments.length : 0} />
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<ThumbUp />} label={thread.Likes} />
                                        <Chip variant='outlined' sx={{ border: "none" }} icon={<Visibility />} label={thread.Views} />
                                    </Stack>
                                </Stack>
                            </Grid2>
                            <Grid2 lg={3}>
                                <Stack spacing={0.5} alignItems='end'>
                                    <Chip variant='outlined' sx={{ border: "none" }} icon={<Person />} label={thread.UserID} />
                                    <Chip variant='outlined' sx={{ border: "none" }} icon={<AccessTimeFilled />} label={dateStr} />
                                </Stack>
                            </Grid2>
                        </Grid2>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    });
    return (
        <Stack spacing={1}>{listItems}</Stack>
    );
}

export default ThreadList;