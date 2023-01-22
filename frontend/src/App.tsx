import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import LoginForm from './components/login/LoginForm';
import CreateNewThread from './pages/CreateNewThread';
import Landing from './pages/Landing';
import ThreadView from './pages/ThreadView';
import { AuthProvider, RequireAuth } from './services/AuthProvider';

function App() {
    return (
        <Container maxWidth="xl">
            <AuthProvider>
                <Header />
                <Container maxWidth="lg">
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/thread/new"
                            element={
                                <RequireAuth>
                                    <CreateNewThread />
                                </RequireAuth>
                            }
                        />
                        <Route path="/thread/:threadId" element={<ThreadView />} />
                    </Routes>
                </Container>
            </AuthProvider>
        </Container>
    );
}

export default App;
