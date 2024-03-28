import axios from '../api/axios';
import useAuth from './useAuth';
type RefreshFunction = () => Promise<string>;

const useRefreshToken: () => RefreshFunction = () => {
    const { auth, setAuth } = useAuth();

    console.log(auth)
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
