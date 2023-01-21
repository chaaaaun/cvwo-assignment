import { Button, Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CommentList from "../components/CommentList";
import SkeletonList from "../components/SkeletonList";
import ThreadDetails from "../components/ThreadDetails";
import ApiService from "../api/CommentAPI";
import { PaginationMetadata } from "../types/ApiResponse";
import { Thread, Comment } from "../types/DataModels";
import ThreadAPI from "../api/ThreadAPI";


function ThreadView() {
    const navigate = useNavigate();
    const isInitialMount = useRef(true);

    const [pageData, setPageData] = useState<PaginationMetadata>();
    const [thread, setThread] = useState<Thread>();
    const [comments, setComments] = useState<Comment[]>();
    const [error, setError] = useState<string>();

    const { threadId } = useParams();

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setComments(undefined)
        setPageData(undefined)
        ApiService.getComments(threadId!, value)
            .then(data => {
                setComments(data.data);
                setPageData(data.pagination);
            })
            .catch(err => setError(err))
    };

    const fetchThreadDetails = () => {
        setError("")

        ThreadAPI.getThreadDetails(threadId!)
            .then(data => setThread(data.data[0]))
            .catch(err => setError(err))

    }

    const fetchComments = () => {
        setError("")
        ApiService.getComments(threadId!, 1)
            .then(data => {
                setComments(data.data);
                setPageData(data.pagination);
            })
            .catch(err => setError(err))
    }


    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchThreadDetails();
            if (error !== undefined) {
                return;
            }
            fetchComments();
        } 

    }, [])

    return (
        <Stack spacing={1} mb={1}>
            {(thread !== undefined)
                ? <ThreadDetails thread={thread} />
                : error !== ""
                    ? <Stack spacing={1} alignItems="center">
                        <Typography variant='h4'>An error has occured</Typography>
                        <Button variant="contained" onClick={fetchThreadDetails}>Retry</Button>
                    </Stack>
                    : <SkeletonList n={3} />
            }
            {(comments !== undefined)
                ? <CommentList comments={comments} />
                : error !== ""
                    ? <Stack spacing={1} alignItems="center">
                        <Typography variant='h4'>An error has occured</Typography>
                        <Button variant="contained" onClick={fetchComments}>Retry</Button>
                    </Stack>
                    : <SkeletonList n={3} />
            }
            {(pageData !== undefined && pageData.TotalPages > 1) && 
                <Pagination 
                    sx={{ alignSelf: "center" }}
                    count={pageData.TotalPages}
                    page={pageData.CurrentPage}
                    onChange={handlePageChange}
                />}
        </Stack>
    );
};

export default ThreadView;