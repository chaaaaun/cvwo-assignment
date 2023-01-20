import { ThreadRequest, CommentRequest } from "../types/ApiRequest";
import { GetThreadResponse } from "../types/ApiResponse";

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
    return await res.json() as GetThreadResponse;
}

const getThreadDetails = async (id: string) => {
    let res = await fetch(`/api/auth/thread/${id}`);
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetThreadResponse;
}

const createComment = async (comment: CommentRequest) => {
    let res = await fetch(`/api/auth/thread/${comment.threadId}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetThreadResponse;
}

const ApiService = { createThread, getThreads, getThreadDetails, createComment }
export default ApiService;