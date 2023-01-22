import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import ThreadForm from '../components/forms/ThreadForm';

export default function EditThread() {
    const { state } = useLocation();
    
    return (
        <Box sx={{
            backgroundColor: "#ffffff0d",
            borderRadius: "10px",
            padding: "20px"
        }}>

            <Typography variant='h4'>Edit thread</Typography>
            <ThreadForm thread={state.thread} />
        </Box>
    );
};