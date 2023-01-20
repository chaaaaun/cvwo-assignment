import React, { FormEventHandler } from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import './App.css';
import UserStatus from './components/UserStatus';
import CreateNewThread from './pages/CreateNewThread';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { AuthProvider, RequireAuth } from './services/AuthProvider';

const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <UserStatus />
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
        </div>
    );
}

export default App;
