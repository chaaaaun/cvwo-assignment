import { Add, Person } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "../login/LoginModal";

function UserStatus() {
    let auth = useAuth();

    if (!auth.user) {
        return <LoginModal />
    } else {
        return (
            <Stack direction="row" spacing={1}>
                <Stack direction="row" spacing={0.5} 
                    alignItems="center" 
                    px={1} py={0.5}
                    border="0.5px solid grey"
                    borderRadius="5px">
                    <Person />
                    <Typography variant="subtitle1" noWrap maxWidth="100px">{auth.user}</Typography>
                </Stack>
                <Button variant="outlined" startIcon={<Add />} component={Link} to="/thread/new">
                    Thread
                </Button>
                <Button onClick={() => auth.logout(() => {})}>
                    Logout
                </Button>
            </Stack>
        );
    }
}

export default UserStatus;
