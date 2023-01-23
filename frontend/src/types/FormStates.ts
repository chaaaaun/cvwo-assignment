export type LoginState = {
    username: string;
    password: string;
    isLogin: boolean;
    isFetching: boolean;
    error: string;
    successMsg: string;
};

export type ThreadState = {
    title: string;
    content: string;
    tags: string;
    isFetching: boolean;
    error: string;
}

export type CommentState = {
    content: string;
}

export type SearchFormState = {
    tags: string;
    user: string;
    sort: string;
    order: "asc" | "desc";
}