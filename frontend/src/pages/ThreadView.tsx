import { Typography, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SkeletonList from "../components/SkeletonList";
import ThreadDetails from "../components/ThreadDetails";
import ThreadList from "../components/ThreadList";
import ApiService from "../services/ApiService";
import { Thread } from "../types/DataModels";

function ThreadView() {
    const navigate = useNavigate();
    const isInitialMount = useRef(true);
    
    const [thread, setThread] = useState<Thread>();
    const [comments, setComments] = useState<Comment[]>();
    const [error, setError] = useState<string>();

    const { threadId } = useParams();

    const fetchThreadDetails = () => {
        setError("")

        if (threadId === undefined) {
            navigate("/")
        } else {
            ApiService.getThreadDetails(threadId)
            .then(data => setThread(data.data[0]))
            .catch(err => setError(err))
        }
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchThreadDetails();
         }
    }, [])

    return (
        <>
            {(thread !== undefined) 
                ? <ThreadDetails thread={thread} />
                : error !== ""
                ? <Stack spacing={1} alignItems="center">
                    <Typography variant='h4'>An error has occured</Typography>
                    <Button variant="contained" onClick={fetchThreadDetails}>Retry</Button>
                </Stack>
                : <SkeletonList n={3} />
            }
        </>
    );
};

export default ThreadView;