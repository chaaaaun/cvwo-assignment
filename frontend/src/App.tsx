import { Container } from '@mui/material';
import React, { FormEventHandler } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserStatus from './components/UserStatus';
import CreateNewThread from './pages/CreateNewThread';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { AuthProvider, RequireAuth } from './services/AuthProvider';

const App: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <AuthProvider>
                <Header />
                <li>
                    <Link to="/">Public Page</Link>
                </li>
                <li>
                    <Link to="/thread/new">Protected Page</Link>
                </li>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/thread/new"
                        element={
                            <RequireAuth>
                                <CreateNewThread />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Container>
    );
}

export default App;
