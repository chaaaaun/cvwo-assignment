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
    content: string;
}