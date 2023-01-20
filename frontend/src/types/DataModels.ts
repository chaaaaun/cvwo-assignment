export type Thread = {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Title: string;
    Content: string;
    Views: number;
    Likes: number;
    Tags: string;
    Comments: number[] | null;
    UserID: string;
}

export type Comment = {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Content: string;
    Likes: number;
    ThreadID: number;
    UserID: string;
}