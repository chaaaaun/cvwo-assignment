import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { ArrowForward, Filter, FilterAlt, Search } from "@mui/icons-material";
import { ChangeEventHandler, useState } from "react";
import FilterForm from "./FilterForm";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 4,
    p: 4,
    borderRadius: "10px"
};

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onQueryChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        setQuery(e.currentTarget.value);
    }


    return (
        <Stack direction="row" flexGrow={1} spacing={0.5}>
            <TextField
                fullWidth
                id="searchbar"
                placeholder="Search thread titles"
                onChange={onQueryChange}
                InputProps={{
                    startAdornment:
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>,
                    endAdornment:
                        <InputAdornment position="end">
                            {query &&
                                <IconButton aria-label="search"><ArrowForward /></IconButton>}
                        </InputAdornment>
                }} />
            <IconButton onClick={handleClickOpen} sx={{ alignSelf: "center" }}>
                <FilterAlt />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <FilterForm query={query} />
                </Box>
            </Modal>
        </Stack>
    )
}