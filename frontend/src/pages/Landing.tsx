import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ThreadAPI from '../api/ThreadAPI';
import { ErrorDialog } from '../components/ErrorDialog';
import SkeletonList from '../components/SkeletonList';
import ThreadList from '../components/ThreadList';
import { Thread } from "../types/DataModels";

type ThreadState = {
    isFetching: boolean;
    error: string;
    data: Thread[];
}

function Landing() {
    const isInitialMount = useRef(true);

    const [state, setState] = useState<ThreadState>({
        isFetching: false,
        error: "",
        data: []
    })

    const fetchThreads = () => {
        setState({
            isFetching: true,
            error: "",
            data: []
        })

        ThreadAPI.getThreads()
            .then(res => setState(prev => { return { ...prev, data: res.data }}))
            .catch(err => setState(prev => { return { ...prev, error: err }}))
            .finally(() => setState(prev => { return {
                ...prev,
                isFetching: false
            }}))
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            fetchThreads();
        }
    }, [])

    return (
        <Box>
            {state.isFetching
                ? <SkeletonList n={3} />
                : state.error
                    ? <ErrorDialog errMsg={`${state.error}`} retryFn={fetchThreads} />
                    : state.data.length !== 0
                        ? <ThreadList threads={state.data} />
                        : <Typography variant='h4'>{`No threads yet :( Create one?`}</Typography>
            }
        </Box>
    );
};

export default Landing;