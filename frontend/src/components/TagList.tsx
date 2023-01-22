import { Chip, Grid } from "@mui/material";

function TagList(props: { tags: string, size: "small" | "medium" }) {
    const listItems = props.tags.split(";").map((tag) =>
        (tag.length !== 0) && 
        <Grid item flexShrink="1">
            <Chip size={props.size} label={tag} key={tag} variant="outlined" />
        </Grid>
    );
    return (
        <Grid container spacing={0.5} overflow="hidden">
            {listItems}
        </Grid>
    );
}

export default TagList;