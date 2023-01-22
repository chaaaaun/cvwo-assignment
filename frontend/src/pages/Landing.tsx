import { Box, Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import ThreadAPI from '../api/ThreadAPI';
import SkeletonList from '../components/SkeletonList';
import ThreadList from '../components/ThreadList';
import { Thread } from "../types/DataModels";

function Landing() {
    const isInitialMount = useRef(true);
    
    const [thread, setThreads] = useState<Thread[]>();
    const [error, setError] = useState<string>();

    const fetchThreads = () => {
        setError("")
        ThreadAPI.getThreads()
        .then(data => setThreads(data.data))
        .catch(err => setError(err))
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchThreads();
         }
    }, [])

    return (
        <Box>
            {(thread !== undefined) 
                ? <ThreadList threads={thread} />
                : error !== ""
                ? <Stack spacing={1} alignItems="center">
                    <Typography variant='h4'>An error has occured</Typography>
                    <Button variant="contained" onClick={fetchThreads}>Retry</Button>
                </Stack>
                : <SkeletonList n={3} />
            }
        </Box>
    );
};

export default Landing;