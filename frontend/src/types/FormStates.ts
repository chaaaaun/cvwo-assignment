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

type ACTIONTYPE =
    | { type: "field"; fieldName: string; payload: string }
    | { type: "toggle"; toggleName: string };

export function reducer(state: LoginState, action: ACTIONTYPE) {
    switch (action.type) {
        case "field":
            return {
                ...state,
                [action.fieldName]: action.payload,
            };
        case "toggle":
            return {
                ...state,
                [action.toggleName]: !state[action.toggleName as keyof LoginState]
            };
        default:
            throw new Error();
    }
}