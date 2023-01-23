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

const getThreads = async (page: string) => {
    let res = await fetch("/api/thread?" + new URLSearchParams({
        page: page,
    }));
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Thread>;
}

const searchThreads = async (page: string, filters: string) => {
    console.log(page);
    
    let res = await fetch(`/api/thread/search?${filters}&` + new URLSearchParams({
        page: page,
    }));
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

const ThreadAPI = { createThread, getThreads, searchThreads, getThreadDetails, updateThread, deleteThread };
export default ThreadAPI;