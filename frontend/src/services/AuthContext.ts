import React from "react";
import { UserLoginRequest } from "../types/ApiRequest";

interface AuthContextType {
    user: string;
    setUser: (username: string) => void;
    login: (user: UserLoginRequest, callback: (error: string) => void) => void;
    logout: (callback: VoidFunction) => void;
  }
  
export const AuthContext = React.createContext<AuthContextType>(null!);

export const useAuth = () => {
    return React.useContext(AuthContext);
}