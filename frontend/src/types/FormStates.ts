export type LoginState = {
    username: string;
    password: string;
    isLogin: boolean;
};

export type ThreadState = {
    title: string;
    content: string;
    tags: string;
}

export type CommentState = {
    content: string;
}