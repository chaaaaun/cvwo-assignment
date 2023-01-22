export type Thread = {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Title: string;
    Content: string;
    Views: number;
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
    ThreadID: string;
    UserID: string;
}