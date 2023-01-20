import { Box, Grid, TextField, Typography } from "@mui/material";
import UserStatus from "./UserStatus";

function Header() {
    return (
        <Box sx={{
            flexGrow: 1
        }}>
            <Grid container spacing={2}>
                <Grid xs={2} item>
                    <Typography variant="h2">Sakura</Typography>
                </Grid>
                <Grid xs={6} item>
                    <TextField fullWidth label="fullWidth" id="fullWidth" />
                </Grid>
                <Grid xs={4} item>
                    <UserStatus />
                </Grid>
            </Grid>


        </Box>
    )
}

export default Header;