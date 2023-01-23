import { Container } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
    let isInitialLoad = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            navigate("/threads/1", { replace: true })
        }
    }, [])
    return (
        <Container maxWidth="xl">
                <Header />
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
        </Container>
    );
}

export default App;
