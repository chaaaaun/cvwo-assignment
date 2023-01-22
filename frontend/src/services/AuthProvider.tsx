import React, { useEffect, useRef } from "react";
import Cookies from 'js-cookie';
import { Navigate, useLocation } from "react-router-dom";
import { UserLoginRequest } from "../types/ApiRequest";
import { AuthContext } from "./AuthContext";
import UserAPI from "../api/UserAPI";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const isInitialMount = useRef(true);
    let [user, setUser] = React.useState<string>("");

    let login = (newUser: UserLoginRequest, callback: (error: string) => void) => {
            UserAPI.loginUser(newUser)
            .then(() => {
                setUser(newUser.id);
                callback('');
            }).catch(err => { callback(err) })
    };

    let logout = (callback: VoidFunction) => {
        Cookies.remove('jwt')
        setUser("")
        callback();
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            
            let token = Cookies.get("jwt")
            if (token !== undefined) {
                UserAPI.getUser()
                    .then((data) => {
                        setUser(data.user)
                    })
                    .catch(() => logout(() => {}))
            }
         }
    }, [])

    let value = { user, setUser, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let auth = React.useContext(AuthContext);
    let location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export { AuthProvider, RequireAuth }