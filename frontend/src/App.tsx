import { Container } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import Header from './components/header/Header';


export default function App() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/") {
            navigate("/threads/1")
        }
    }, [pathname])

    return (
        <Container maxWidth="xl">
            <Header />
            <Container maxWidth="lg"
                className={
                    navigation.state === "loading" ? "loading" : ""
                }>
                <Outlet />
            </Container>
        </Container>
    );
}
