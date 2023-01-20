import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import LoginForm from './LoginForm';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 4,
    p: 4,
    borderRadius: "10px"
};

export default function LoginModal() {
    const [open, setOpen] = React.useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

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
        } else {
            setOpen(true);
        }
    }

    const handleOpen = () => checkJwt();
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Log In</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="login-modal"
                aria-describedby="login-form-modal"
            >
                <Box sx={modalStyle}>
                    <LoginForm />
                </Box>
            </Modal>
        </div>
    );
}