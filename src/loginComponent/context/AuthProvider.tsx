import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType>({ auth: {}, setAuth: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<any>({});
    console.log(children);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

