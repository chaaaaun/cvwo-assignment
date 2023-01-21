import { ThreadRequest } from "../types/ApiRequest";
import { GetResponse } from "../types/ApiResponse";
import { Thread } from "../types/DataModels";

const createThread = async (thread: ThreadRequest) => {
    let res = await fetch("/api/auth/thread", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(thread),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const getThreads = async () => {
    let res = await fetch("/api/thread");
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Thread>;
}

const getThreadDetails = async (id: string) => {
    let res = await fetch(`/api/thread/${id}`);
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Thread>;
}

const ThreadAPI = { createThread, getThreads, getThreadDetails };
export default ThreadAPI;