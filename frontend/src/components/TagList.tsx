import { Chip, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function TagList(props: { tags: string }) {
    const listItems = props.tags.split(";").map((tag) =>
        (tag.length !== 0) && <Chip size="small" label={tag} key={tag} variant="outlined" />
    );
    return (
        <Stack direction='row' spacing={0.5}>
            {listItems}
        </Stack>
    );
}

export default TagList;