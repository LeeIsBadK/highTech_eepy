import Sidebar from '../Components/sidebar';
import Fund from '../Components/fund';
import Favorite from '../Components/favorite';
import { useContext, useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../loginComponent/context/AuthProvider';

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});


const FundPage: React.FC = () => {
  const [fundData2, setFundData2] = useState<Array<any> | null>(null);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/allpro');
        setFundData2(response.data); // Assuming the API response is an array of fund objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFavorite = (favorite:boolean) => {
    setFundData2(null);
    setShowFavorite(!favorite);
    if (!favorite) {
      const fetchData = async () => {
        try {
          const response = await apiClient.get(`/fav/${auth.user}`);
          setFundData2(response.data[0].proj_abbr_name_list);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const response = await apiClient.get('/allpro');
          setFundData2(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
  };

  return (
    <div className="flex transition-all duration-500 ease-in-out"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />
      <div className="w-full pl-2 pt-4 sm:pt-7 lg:pt-11 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100svh] overflow-y-auto">
        <div className='px-2 pb-4 mt-1 sm:px-4 sm:pb-8 sm:mt-2 lg:px-7 lg:pb-12'>
          <div className="px-8 grid grid-cols-4 gap-x-5 items-center">
            <h2 className="sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] font-bold tracking-tight text-[#072C29]">รายละเอียดกองทุน</h2>
            <div className="col-span-2 ml-auto mr-auto">
              <button
                className="flex relative outline-none rounded-[5px] px-4 py-1 border border-[#1CA59B] shadow-md mr-2 bg-white"
              >
                <Search size={21} className="sm:mt-[4px] lg:mt-[1px] 2xl:w-[21px] 2xl:h-[21px] xl:w-[19px] xl:h-[19px] lg:w-[17px] lg:h-[17px] md:w-[15px] md:h-[15px] sm:w-[13px] sm:h-[13px]" />
                <input
                  type="text"
                  placeholder="Search Mutual Funds"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-3 sm:w-[175px] md:w-[225px] lg:w-[275px] xl:w-[335px] 2xl:w-[395px] outline-none placeholder-[#1CA59B] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
                />
                {searchTerm !== '' && (<X className="xl:mt-[-1px] 2xl:w-[24px] 2xl:h-[24px] xl:w-[22px] xl:h-[22px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] sm:w-[16px] sm:h-[16px] items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setSearchTerm('')} />)}
              </button>
            </div>
            <button className="ml-auto" onClick={() => {
              handleFavorite(showFavorite);
              }}
            >
              <Favorite showFavorite={showFavorite} />
            </button>
          </div>
        </div>
        <Fund funds={fundData2} />
      </div>
    </div>
  );
}

export default FundPage;