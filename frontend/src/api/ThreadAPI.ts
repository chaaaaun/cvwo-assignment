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

const updateThread = async (thread: ThreadRequest, id: string) => {
    let res = await fetch(`/api/auth/thread/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(thread),
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const deleteThread = async (id: string) => {
    let res = await fetch(`/api/auth/thread/${id}`, {
        method: 'DELETE'
    })
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const ThreadAPI = { createThread, getThreads, getThreadDetails, updateThread, deleteThread };
export default ThreadAPI;