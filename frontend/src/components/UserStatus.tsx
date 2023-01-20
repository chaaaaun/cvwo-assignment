import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

function UserStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    const checkJwt = () => {
        let token = Cookies.get("jwt")
        if (token !== undefined) {
            fetch("/user", { credentials: "include" })
                .then((response) => response.json())
                .then((data) => {
                    auth.setUser(data.user)
                    navigate("/")
                })
                .catch(() => auth.logout(() => { }))
        }
    }

    if (!auth.user) {
        return <Button component={Link} to="/login" onClick={checkJwt}>Login</Button>
    } else {
        return (
            <Box>
                <Typography variant="body1">Welcome {auth.user}!</Typography>
                <Button component={Link} to="/thread/new">New Thread</Button>
                <Button onClick={() => { auth.logout(() => navigate("/")); }}>
                    Logout
                </Button>
            </Box>
        );
    }
}

export default UserStatus;
