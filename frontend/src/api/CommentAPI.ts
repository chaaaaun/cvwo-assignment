import { CommentRequest } from "../types/ApiRequest";
import { GetResponse } from "../types/ApiResponse";
import { Comment } from "../types/DataModels";

// POSTs payload
const createComment = async (comment: CommentRequest, threadID: string) => {
    let res = await fetch(`/api/auth/thread/${threadID}/comment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const getComments = async (threadID: string, page: number) => {
    let res = await fetch(`/api/thread/${threadID}/comment?` + new URLSearchParams({
        page: page.toString(),
    }));
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Comment>;
}

const updateComment = async (comment: CommentRequest, threadID: string, commentID: string) => {
    let res = await fetch(`/api/auth/thread/${threadID}/comment/${commentID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const deleteComment = async (threadID: string, commentID: string) => {
    let res = await fetch(`/api/auth/thread/${threadID}/comment/${commentID}`, {
        method: 'DELETE',
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return;
}

const CommentAPI = { getComments, createComment, updateComment, deleteComment }
export default CommentAPI;