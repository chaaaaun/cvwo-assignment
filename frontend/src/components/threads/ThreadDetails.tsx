import { ArrowBack, Edit, Person } from "@mui/icons-material";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThreadAPI from "../../api/ThreadAPI";
import { useAuth } from "../../contexts/AuthContext";
import { Thread } from "../../types/DataModels";
import DeleteModal from "../DeleteModal";
import CommentForm from "../comments/CommentForm";
import TagList from "./TagList";

function ThreadDetails(props: { thread: Thread }) {
    const navigate = useNavigate();
    const auth = useAuth();
    const dateObj = new Date(props.thread.CreatedAt)
    props.thread.CreatedAt = dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' })

    const handleEdit = () => {
        navigate("/thread/edit", { state: { thread: props.thread } })
    }

    const handleDelete = () => {
        ThreadAPI.deleteThread(props.thread.ID)
            .then(() => navigate("/"))
            .catch(err => console.error(err))
    }
    return (
        <Card>
            <CardContent>
                <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                        <Button variant="text" startIcon={<ArrowBack />} sx={{ alignSelf: "start" }} onClick={() => navigate(-1)}>Go Back</Button>
                        {auth.user === props.thread.UserID &&
                            <Stack direction="row" spacing={0.5}>
                                <Button 
                                    variant="text" 
                                    startIcon={<Edit />} 
                                    onClick={handleEdit}>Edit</Button>
                                <DeleteModal fn={handleDelete} />
                            </Stack>
                        }
                    </Stack>
                    <TagList tags={props.thread.Tags} size="medium" />
                    <Typography variant="h3">{props.thread.Title}</Typography>
                    <Typography variant="body1">{props.thread.Content}</Typography>
                    <Stack direction='row' justifyContent='end' spacing={0.5} marginBottom={3}>
                        <Stack spacing={0} alignItems='end'>
                            <Chip variant='outlined' sx={{ border: "none" }} icon={<Person />} label={props.thread.UserID} />
                            <Chip variant='outlined' sx={{ border: "none" }} label={"Created " + props.thread.CreatedAt} />
                        </Stack>
                    </Stack>
                    <CommentForm threadId={props.thread.ID} />
                </Stack>
            </CardContent>
        </Card>
    );
}

export default ThreadDetails;