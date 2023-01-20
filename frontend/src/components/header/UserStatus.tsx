import { Button, Stack, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import LoginModal from "../login/LoginModal";

function UserStatus() {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
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
