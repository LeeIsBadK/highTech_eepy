import { createContext, useState, ReactNode } from "react";

export type Auth = {
    user: string;
    pwd: string;
    accessToken: string;
}

export interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const defaultState = {
    auth: {
        user: '',
        pwd: '',
        accessToken: ''
    },
    setAuth: () => {}
} as AuthContextType

const AuthContext = createContext(defaultState);

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<Auth>({
        user: '',
        pwd: '',
        accessToken: ''
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

