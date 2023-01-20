import { Box, Typography } from '@mui/material';
import React from 'react';
import ThreadForm from '../components/forms/ThreadForm';

function CreateNewThread() {
    return (
        <Box sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff0d",
            borderRadius: "10px",
            padding: "20px"
        }}>
            
            <Typography variant='h4'>Create new thread</Typography>
            <ThreadForm />
        </Box>
    );
};

export default CreateNewThread;