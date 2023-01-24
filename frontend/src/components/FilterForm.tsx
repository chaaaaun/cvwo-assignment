import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useReducer, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import theme from "../theme";
import { reducer, SearchFormState } from "../types/FormStates";

export default function FilterForm(props: { query: string, closeFn: VoidFunction }) {
    const navigate = useNavigate();
    // const { pathname } = useLocation();

    const initialState: SearchFormState = {
        tags: "",
        user: "",
        sort: "updated_at",
        order: "desc",
    }

    const [state, dispatch] = useReducer(reducer<SearchFormState>, initialState);
    const [error, setError] = useState("");

    const onTagsChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'tags', payload: e.currentTarget.value })
    }

    const onUserChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        dispatch({ type: 'field', fieldName: 'user', payload: e.currentTarget.value })
    }

    const onOrderChange = (
        e: React.MouseEvent<HTMLElement>,
        newOrder: string | null,
    ) => {
        if (newOrder !== null) {
            dispatch({ type: 'field', fieldName: 'order', payload: newOrder })
        }
    };

    const onSortChange = (event: SelectChangeEvent) => {
        dispatch({ type: 'field', fieldName: 'sort', payload: event.target.value as string });
    };

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setError("")
        // Validate tag input to only alphanumeric and semicolons
        const tagRegex = /^([0-9;]|[a-z;])*([0-9a-z;]*)$/gi
        if (!state.tags.match(tagRegex)) {
            setError("Tag error")
            return;
        }

        navigate({
            pathname: "/threads/1",
            search: createSearchParams({
                ...state,
                q: props.query
            }).toString()
        })
        props.closeFn()
    }


    return (
        <form>
            <Stack spacing={1}>
                <Typography variant="h4">Filter Threads</Typography>
                <TextField fullWidth onChange={onTagsChange}
                    value={state.tags}
                    id="tags-field"
                    label="Tags"
                    variant="outlined"
                    margin="dense"
                    error={error === "Tag error"}
                    inputProps={{
                        maxLength: 1000,
                    }}
                />
                <TextField fullWidth onChange={onUserChange}
                    value={state.user}
                    id="user-field"
                    label="Created by"
                    margin="dense"
                    inputProps={{
                        maxLength: 50,
                    }}
                />
                <Stack direction="row" spacing={0.5}>
                    <FormControl fullWidth>
                        <InputLabel id="select-sort-label">Sort by</InputLabel>
                        <Select
                            labelId="select-sort-label"
                            id="sort-select"
                            value={state.sort}
                            label="Sort by"
                            onChange={onSortChange}
                        >
                            <MenuItem value={"created_at"}>Created At</MenuItem>
                            <MenuItem value={"updated_at"}>Updated At</MenuItem>
                            <MenuItem value={"views"}>Views</MenuItem>
                        </Select>
                    </FormControl>
                    <ToggleButtonGroup
                        value={state.order}
                        exclusive
                        onChange={onOrderChange}
                        aria-label="order-toggle"
                    >
                        <ToggleButton value="asc" aria-label="ascending">
                            <ArrowUpward />
                        </ToggleButton>
                        <ToggleButton value="desc" aria-label="descending">
                            <ArrowDownward />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                <Button onClick={handleSubmit}
                    variant="contained"
                    sx={{ marginY: theme.spacing(1) }}>
                    Search
                </Button>
            </Stack>
        </form>
    );
}