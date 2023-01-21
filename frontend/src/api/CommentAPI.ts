import { CommentRequest } from "../types/ApiRequest";
import { GetResponse } from "../types/ApiResponse";
import { Comment } from "../types/DataModels";

const createComment = async (comment: CommentRequest) => {
    let res = await fetch(`/api/auth/thread/${comment.threadID}/comment`, {
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

const updateComment = async (comment: CommentRequest, commentID: string) => {
    let res = await fetch(`/api/auth/thread/${comment.threadID}/comment/${commentID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Comment>;
}

const deleteComment = async (threadID: string, commentID: string) => {
    let res = await fetch(`/api/auth/thread/${threadID}/comment/${commentID}`, {
        method: 'DELETE',
    });
    if (!res.ok) { throw new Error(res.statusText) }
    return await res.json() as GetResponse<Comment>;
}

const CommentAPI = { getComments, createComment, updateComment, deleteComment }
export default CommentAPI;