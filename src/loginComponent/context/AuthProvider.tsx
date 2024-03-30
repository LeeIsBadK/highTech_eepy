import { createContext, ReactNode, useMemo } from "react";
import { useLocalStorage } from '../hook/useLocalStorage'; // Assuming you've implemented the useLocalStorage hook

export type Auth = {
    user: string;
    pwd: string;
    accessToken: string;
}

export interface AuthContextType {
    auth: Auth;
    setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

const defaultState = {
    auth: {
        user: '',
        pwd: '',
        accessToken: ''
    },
    setAuth: () => { }
} as AuthContextType

const AuthContext = createContext(defaultState);

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useLocalStorage<Auth>('auth', {
        user: '',
        pwd: '',
        accessToken: ''
    });

    const value = useMemo(
        () => ({
            auth,
            setAuth
        }),
        [auth]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
