import React from "react";
import { UserLoginDetails } from "../types/DataModels";

interface AuthContextType {
    user: string;
    setUser: (username: string) => void;
    login: (user: UserLoginDetails, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
  }
  
export const AuthContext = React.createContext<AuthContextType>(null!);

export const useAuth = () => {
    return React.useContext(AuthContext);
}