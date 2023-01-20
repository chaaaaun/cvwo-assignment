import { Box, Typography } from '@mui/material';
import React from 'react';

function CreateNewThread() {
    return (
        <Box sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff0d",
            borderRadius: "10px",
            padding: "10px"
        }}>
            
            <Typography variant='h4'>Create new thread</Typography>
        </Box>
    );
};

export default CreateNewThread;