import { useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';

type RefreshFunction = () => Promise<string>;

const useRefreshToken: () => RefreshFunction = () => {
    const { setAuth } = useContext(AuthContext);

    const refresh: RefreshFunction = async () => {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            setAuth((prev: any) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken }
            });

            return response.data.accessToken;

    }

    return refresh;
};

export default useRefreshToken;
