import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Cookies from 'js-cookie';
import { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import UserAPI from '../../api/UserAPI';
import { useAuth } from '../../services/AuthContext';
import UserStatus from "./UserStatus";

function Header() {
    const isInitialMount = useRef(true);
    const auth = useAuth();

    const checkJwt = () => {
        let token = Cookies.get("jwt")
        if (token !== undefined) {
            UserAPI.getUser()
                .then((data) => {
                    auth.setUser(data.user)
                })
                .catch(() => auth.logout(() => {}))
        }
    }

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            checkJwt();
         }
    }, [])

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