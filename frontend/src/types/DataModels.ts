export type Thread ={
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    Title: string,
    Content: string,
    Views: number,
    Likes: number,
    Tags: string,
    Comments: number[] | null,
    UserID: string
}