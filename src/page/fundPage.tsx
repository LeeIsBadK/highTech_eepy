import Sidebar from '../Components/sidebar';
import Fund from '../Components/fund';
import Favorite from '../Components/favorite';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});


const FundPage: React.FC = () => {
  const [fundData2, setFundData2] = useState<Array<any> | null>(null);
  const [showFavorite, setShowFavorite] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchFetch, setSearchFetch] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    if (!parts.includes('fund'))
      navigate('/fund', { state: { from: location }, replace: true });
  }, [location.pathname]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get("search");
    if (search) 
      setSearchTerm(search);
    setCheck(true);
  }, [location.search]);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    setSearchFetch(true);
    setSkip(0);
    setPage(1);
    setTimeout(() => {
      setSearchFetch(false);
    }, 7500);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (check) {
        try {
          const response = await apiClient.get(`/filter/product?searchString=${searchTerm}&take=20&skip=&orderBy=asc`);
          setFundData2(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

    };
    fetchData();
  }, [searchTerm, searchFetch, check]);

  const handleFavorite = (favorite: boolean) => {
    setShowFavorite(!favorite);
  };

  const [skip, setSkip] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const handleNext = async () => {
    try {
      const response = await apiClient.get(`/filter/product?searchString=${searchTerm}&take=20&skip=${skip + 20}&orderBy=asc`);
      if (response.data.length === 0)
        return;
      setFundData2(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setSkip(skip + 20);
    setPage(page + 1);

  }
  const handlePrevious = async () => {
    if (page > 1) {
      try {
        const response = await apiClient.get(`/filter/product?searchString=${searchTerm}&take=20&skip=${skip - 20}&orderBy=asc`);
        setFundData2(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setSkip(skip - 20);
      setPage(page - 1);
    }
  }

  return (
    <div className="flex transition-all duration-500 ease-in-out min-w-[650px]"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />
      <div className="w-full pl-0 pt-0 lg:pt-11 pb-4 lg:pb-12 items-center bg-[#f9f9f9] min-h-[100svh] max-h-[100svh] overflow-y-auto overflow-x-auto">
        <div className='pb-10 pt-40 lg:pt-0 lg:pb-12'>
          <Navbar />
          <div className="px-14 lg:px-16 flex items-center">
            <h2 className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] 2xl:text-[32px] min-w-[135px] font-bold tracking-tight text-[#072C29]">รายละเอียดกองทุน</h2>
            <div className="ml-auto mr-auto">
              <div className="flex relative outline-none rounded-[5px] px-4 py-1 border border-[#1CA59B] shadow-md mr-4 bg-white">
                <Search size={21} className="mt-[0px] sm:mt-[1px] 2xl:w-[21px] 2xl:h-[21px] lg:w-[17px] lg:h-[17px] md:w-[15px] md:h-[15px] w-[13px] h-[13px]" />
                <input
                  type="text"
                  placeholder="Search Mutual Funds"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="ml-3 w-[175px] lg:w-[260px] 2xl:w-[395px] outline-none placeholder-[#1CA59B] text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]"
                />
                {searchTerm !== '' && (<X className="2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] w-[16px] h-[16px] items-end absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setSearchTerm('')} />)}
              </div>
            </div>
            <button className="ml-auto" onClick={() => {
              handleFavorite(showFavorite);
            }}
            >
              <Favorite showFavorite={showFavorite} />
            </button>
          </div>
        </div>
        <Fund funds={fundData2} showFavorite={showFavorite} />
        {fundData2 && fundData2.length !== 0 && !showFavorite && (
          <div className='w-full flex items-center justify-end space-x-6 px-16 py-4'>
            <button className='px-2 py-1 rounded-[10px] bg-white shadow-md' onClick={handlePrevious}>
              <ChevronLeft size={30} />
            </button>
            <span className='text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]'>Page {page}</span>
            <button className='px-2 py-1 rounded-[10px] bg-white shadow-md' onClick={handleNext}>
              <ChevronRight size={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FundPage;