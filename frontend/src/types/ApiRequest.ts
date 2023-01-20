export type UserLoginRequest = {
    id: string;
    password: string;
}

export type ThreadRequest = {
    title: string;
    content: string;
    tags: string;
}

export type CommentRequest = {
    threadId: string;
    content: string;
}