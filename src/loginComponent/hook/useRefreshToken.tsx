import { useContext } from 'react';
import axios from '../api/loginAxios';
import AuthContext from '../context/AuthProvider';

type RefreshFunction = () => Promise<string>;

const useRefreshToken: () => RefreshFunction = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const refresh: RefreshFunction = async () => {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            setAuth({
                "user": auth.user,
                "pwd": auth.pwd,
                "accessToken": response.data.accessToken 
            });

            return response.data.accessToken;

    }

    return refresh;
};

export default useRefreshToken;
