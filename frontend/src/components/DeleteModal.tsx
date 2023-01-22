import { Delete } from '@mui/icons-material';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React from 'react';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 4,
    p: 4,
    borderRadius: "10px"
};

export default function DeleteModal(props: { fn: VoidFunction }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                variant="text"
                startIcon={<Delete />}
                color="error"
                onClick={handleOpen}>Delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-modal"
                aria-describedby="delete-dialog-modal"
            >
                <Box sx={modalStyle}>
                    <Typography id="delete-modal-title" variant="h5" component="h2">
                        Are you sure?
                    </Typography>
                    <Stack direction="row" justifyContent="end" spacing={1}>
                        <Button variant="text" onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" color="error" onClick={props.fn}>
                            Delete
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}