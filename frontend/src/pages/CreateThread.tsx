import { Box, Typography } from '@mui/material';
import ThreadForm from '../components/forms/ThreadForm';

export default function CreateNewThread() {
    return (
        <Box sx={{
            backgroundColor: "#ffffff0d",
            borderRadius: "10px",
            padding: "20px"
        }}>

            <Typography variant='h4'>Create a thread</Typography>
            <ThreadForm />
        </Box>
    );
};