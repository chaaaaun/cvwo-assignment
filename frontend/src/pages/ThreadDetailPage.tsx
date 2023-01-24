import { Stack } from "@mui/system";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useLoaderData, useNavigate } from "react-router-dom";
import ThreadAPI from "../api/ThreadAPI";
import ThreadDetails from "../components/threads/ThreadDetails";
import { Thread } from "../types/DataModels";

export async function threadViewLoader({ params }: any) {
    const thread = await ThreadAPI.getThreadDetails(params.id);
    return thread;
}

function ThreadView() {
    const thread = useLoaderData() as Thread;

    let isInitialLoad = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            navigate("1", { replace: true })
        }
    }, [])

    return (
        <Stack spacing={1} mb={1}>
            {
                (thread !== undefined) && <ThreadDetails thread={thread} />
            }
            <Outlet />
        </Stack>
    );
};

export default ThreadView;