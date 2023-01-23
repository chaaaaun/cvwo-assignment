import { Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import CommentAPI from "../api/CommentAPI";
import { GetResponse } from "../types/ApiResponse";
import { Comment } from "../types/DataModels";
import CommentItem from "./CommentItem";

export async function commentsLoader({ params }: any) {
    const comments = await CommentAPI.getComments(params.id, params.page ? params.page : "1");
    return comments;
}

function CommentList() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const data = useLoaderData() as GetResponse<Comment>;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        navigate(`${pathname}/../${value}`, { replace: true })
    };

    const listItems = data.data.map((comment) => {
        return (
            <CommentItem key={comment.ID} comment={comment} />
        )
    });
    return (
        <Stack spacing={1}>
            {listItems.length !== 0
                ? listItems
                : <Typography variant="h5">{`No comments yet :( Write one?`}</Typography>
            }
            {(data.pagination !== undefined && data.pagination.TotalPages > 1) &&
            <Pagination
                sx={{ alignSelf: "center" }}
                count={data.pagination.TotalPages}
                page={data.pagination.CurrentPage}
                onChange={handlePageChange}
            />}
        </Stack>
        
    );
}

export default CommentList;