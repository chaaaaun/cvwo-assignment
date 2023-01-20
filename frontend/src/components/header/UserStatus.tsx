import { Button, Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import LoginModal from "../login/LoginModal";

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
        // return <Button component={Link} to="/login" onClick={checkJwt}>Login</Button>
        return <LoginModal />
    } else {
        return (
            <Stack direction="row" spacing={2}>
                <Typography variant="body1">Welcome {auth.user}!</Typography>
                <Button component={Link} to="/thread/new">New Thread</Button>
                <Button onClick={() => { auth.logout(() => navigate("/")); }}>
                    Logout
                </Button>
            </Stack>
        );
    }
}

export default UserStatus;
