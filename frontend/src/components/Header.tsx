import { Box, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UserStatus from "./UserStatus";
import theme from "../theme";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

function Header() {
    return (
        <Stack direction="row" spacing={2} sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff0d",
            borderRadius: "0 0 10px 10px",
            padding: "10px 15px 5px 15px",
            marginBottom: "15px"
        }}>
            <Stack direction="row" spacing={1} alignItems="center" component={Link} to="/" sx={{ textDecoration: "none", color: 'white'}}>
                {/* <Box
                    component="img"
                    sx={{
                        height: 64,
                        width: 64,
                    }}
                    alt="The house from the offer."
                    src={process.env.PUBLIC_URL + "/logo512.png"}
                /> */}
                <Typography variant="h2">Sakura</Typography>
            </Stack>
            <TextField
                fullWidth
                id="searchbar"
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    endAdornment:
                        <InputAdornment position="end">
                            <IconButton aria-label="search"><ArrowForwardIcon /></IconButton>
                        </InputAdornment>
                }} />
            <UserStatus />
        </Stack>
    )
}

export default Header;