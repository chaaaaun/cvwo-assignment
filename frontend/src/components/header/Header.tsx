import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import SearchForm from './SearchBar';
import UserStatus from "./UserStatus";

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
                <Typography variant="h2" sx={{ fontFamily: '"Water Brush", cursive' }} ><span style={{ color: '#ffb7c5' }}>S</span>akura</Typography>
            </Stack>
            <SearchForm />
            <UserStatus />
        </Stack>
    )
}

export default Header;