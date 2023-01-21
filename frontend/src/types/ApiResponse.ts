export type UserResponse = {
    user: string;
}

export type GetResponse<T> = {
    pagination: PaginationMetadata;
    data: T[];
}

export type PaginationMetadata = {
    NextPage: number;
    PreviousPage: number;
    CurrentPage: number;
    TotalPages: number;
}