import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import { Thread } from "../types/DataModels";

function SkeletonList(props: { n: number }) {
    const listItems = [];
    for (let i = 0; i < props.n; i++) {
        listItems.push(<Skeleton variant="rounded" key={i} animation="wave" sx={{ width: "100%", height: "100px" }} /> );
    }
    return (
        <Stack spacing={1}>{listItems}</Stack>
    );
}

export default SkeletonList;