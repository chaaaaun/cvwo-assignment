import { Stack } from '@mui/system';
import React from 'react';

const Landing: React.FC = () => {
    return (
        <Stack sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff0d",
            borderRadius: "10px",
            padding: "10px"
        }}>
            {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
        </Stack>
    );
};

export default Landing;