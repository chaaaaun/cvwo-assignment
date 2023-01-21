import { ThreadRequest, CommentRequest } from "../types/ApiRequest";
import { GetResponse } from "../types/ApiResponse";
import { Comment, Thread } from "../types/DataModels";

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
    let res = await fetch(`/api/auth/thread/${id}`);
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Thread>;
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
    return;
}

const getComments = async (threadId: string, page: number) => {
    let res = await fetch('/api/comment?' + new URLSearchParams({
        threadId: threadId,
        page: page.toString(),
    }));
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Comment>;
}

const ApiService = { createThread, getThreads, getThreadDetails, createComment, getComments }
export default ApiService;