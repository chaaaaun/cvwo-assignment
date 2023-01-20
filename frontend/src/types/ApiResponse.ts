import { Thread } from "../types/DataModels";

export type GetThreadResponse = {
    pagination: PaginationMetadata;
    data: Thread[];
}

type PaginationMetadata = {
    NextPage: number,
    PreviousPage: number,
    CurrentPage: number,
    TotalPages: number
}