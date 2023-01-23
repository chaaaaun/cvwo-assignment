import { Pagination, Stack, Typography } from '@mui/material';
import React from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import ThreadAPI from '../api/ThreadAPI';
import ThreadList from '../components/ThreadList';
import { GetResponse } from '../types/ApiResponse';
import { Thread } from "../types/DataModels";

export async function threadListLoader({ params }: any) {
    const threads = await ThreadAPI.getThreads(params.page ? params.page : "1");
    return threads;
}

function ThreadListPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const threads = useLoaderData() as GetResponse<Thread>;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`${pathname}/../${value}`, { replace: true })
    };

    return (
        <Stack>
            {threads.data.length !== 0
                ? <ThreadList threads={threads.data} />
                : <Typography variant='h4'>{`No threads yet :( Create one?`}</Typography>
            }
            {(threads.pagination !== undefined && threads.pagination.TotalPages > 1) &&
                <Pagination
                    sx={{ alignSelf: "center" }}
                    count={threads.pagination.TotalPages}
                    page={threads.pagination.CurrentPage}
                    onChange={handlePageChange}
                />}
        </Stack>
    );
};

export default ThreadListPage;