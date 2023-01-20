import { Container } from '@mui/material';
import React, { FormEventHandler } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import Header from './components/header/Header';
import CreateNewThread from './pages/CreateNewThread';
import Landing from './pages/Landing';
import LoginForm from './components/login/LoginForm';
import { AuthProvider, RequireAuth } from './services/AuthProvider';

function App() {
    return (
        <Container maxWidth="lg">
            <AuthProvider>
                <Header />
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
                </Routes>
            </AuthProvider>
        </Container>
    );
}

export default App;
