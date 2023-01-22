import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import LoginModal from "../login/LoginModal";

function UserStatus() {
    let auth = useAuth();
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (!auth.user) {
        return <LoginModal />
    } else {
        return (
            <Stack direction="row" spacing={2}>
                <Typography variant="body1">Welcome {auth.user}!</Typography>
                <Button component={Link} to="/thread/new">New Thread</Button>
                <Button onClick={() => { auth.logout(() => navigate(from, { replace: true })); }}>
                    Logout
                </Button>
            </Stack>
        );
    }
}

export default UserStatus;
