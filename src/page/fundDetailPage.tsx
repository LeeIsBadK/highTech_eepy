import { useState, useEffect, useContext } from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Favorite from '../fundDetailComponent/favorite';
import { useLocation, useNavigate } from 'react-router-dom';
import Detail from '../fundDetailComponent/detail';
import { ChevronLeft, Clock, Triangle } from 'lucide-react';
import Compare from '../fundDetailComponent/compare';
import { useLocalStorage } from '../loginComponent/hook/useLocalStorage';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import AuthContext from '../loginComponent/context/AuthProvider';


const allStatus = {
  "goUp": <Triangle fill='#00bc91' size={18} className='text-[#00bc91] mr-[7px] mt-[-4px] 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] w-[10px] h-[10px]' />,
  "goDown": <Triangle fill='#ef5350' size={18} className='text-[#ef5350] mr-[7px] mt-[-4px] 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] w-[10px] h-[10px] rotate-180' />
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const FundDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allFunds, setAllFunds] = useState<Array<any> | null>(null);
  const [fund, setFund] = useState<string>('');
  const [checkFunds, setCheckFunds] = useState<boolean>(false);
  const [storedDetail, setStoredDetail] = useLocalStorage("detail", "");
  const [favorite, setFavorite] = useState<boolean>(false);
  const [selectedFavorite, setSelectedFavorite] = useState<any[] | null>(null);
  const { auth } = useContext(AuthContext);
  const [number, setNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<any | null>(null);

  const goBack = () => navigate(-1);

  const [fundData, setFundData] = useState<any | null>(null);

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    const fund = parts[parts.length - 1];
    if (fund && fund !== 'edit' && (fund === 'performance' || fund === 'port' || fund === 'fee')) {
      if (storedDetail) {
        if (fund === 'performance')
          navigate('/detail/performance/' + storedDetail, { state: { from: location }, replace: true });
        if (fund === 'port')
          navigate('/detail/port/' + storedDetail, { state: { from: location }, replace: true });
        if (fund === 'fee')
          navigate('/detail/fee/' + storedDetail, { state: { from: location }, replace: true });
        setFund(storedDetail);
      } else {
        setFund('');
        setCheckFunds(true);
      }
    } else {
      if (fund && fund === 'detail') {
        if (storedDetail) {
          navigate('/detail/' + storedDetail, { state: { from: location }, replace: true });
          setFund(storedDetail);
        }
        else {
          setFund('');
          setCheckFunds(true);
        }
      } else {
        setFund(fund);
        setStoredDetail(fund);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!fundData && fund) {
          const response = await apiClient.get('/detail/' + fund);
          setFundData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/missing', { state: { from: location }, replace: true });
      }
    };
  
    fetchDataForAllFunds();
  }, [fundData, fund]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/filter/product?searchString=&take=20&skip=&orderBy=asc');
        setAllFunds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fund && !selectedFavorite) {
        try {
          const response = await apiClient.get(`/fav/${auth.user}`);
          const data = response.data.proj_abbr_name_list;
          setSelectedFavorite(data);
          if (data.includes(fund))
            setFavorite(true);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    }
    fetchData();
  }, [fund, selectedFavorite]);

  const handleFavorite = async () => {
    setFavorite(!favorite);
    if (selectedFavorite?.includes(fund)) {
      try {
        await apiClient.delete(`/fav/delete/${auth.user}/${fund}`, {
          withCredentials: true
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      try {
        await apiClient.post(`/fav/add/${auth.user}`,
          JSON.stringify({ "proj_abbr_name": fund }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  useEffect(() => {
    if (fundData && fundData.Allinfo.nav && fundData.Allinfo.nav.NAV && fundData.Allinfo.nav.NAV.length !== 0 && fundData.Allinfo.nav.NAV[0].length > 2 && fundData.dailyval !== 0) {
      const numberDiff = parseFloat(fundData.Allinfo.nav.NAV[fundData.Allinfo.nav.NAV.length - 1][1])  - parseFloat(fundData.Allinfo.nav.NAV[fundData.Allinfo.nav.NAV.length - 6][1]);
      if (numberDiff < 0) {
        setStatus(allStatus.goDown);
        setNumber(numberDiff !== null ? numberDiff.toFixed(4).toString() : null);
      }
      else if (numberDiff > 0) {
        setStatus(allStatus.goUp);
        setNumber(numberDiff !== null ? '+' + numberDiff.toFixed(4) : null);
      }
      else {
        setStatus('');
        setNumber(numberDiff !== null ? numberDiff.toString() : null);
      }
    }
  }, [fundData, number, status]);

  console.log(fundData);

  return (
    <div className="flex transition-all duration-500 ease-in-out min-w-[650px]"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />

      <div className="w-full px-2 lg:px-16 pt-0 lg:pt-11 pb-4 lg:pb-12 items-center bg-[#f9f9f9] min-h-[100svh] max-h-[100svh] overflow-y-auto">
        <div className='pb-10 pt-40 lg:pt-0 lg:pb-12'>
          <Navbar />
          <div className="px-3 xl:px-4 grid grid-cols-3 gap-x-3.5 items-center">
            <h2 className="flex space-x-1.5 items-center text-[15px] md:text-[19px] lg:text-[23px] 2xl:text-[31px] font-bold tracking-tight text-[#072C29]">
              <button onClick={goBack}>
                <ChevronLeft size={36} className='2xl:w-9 2xl:h-9 lg:w-7 lg:h-7 w-5 h-5' />
              </button>
              รายละเอียดกองทุน
            </h2>
            <div className="ml-auto mr-auto">
              <SearchBar funds={allFunds} />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6 py-6 px-6 lg:px-8 bg-white shadow-md rounded-[10px]">
          <div className='px-2 w-full'>
            <div className='flex'>
              <div>
                {fundData? (
                  <h2 className="text-[15px] md:text-[17px] lg:text-[19px] 2xl:text-[23px] py-1 font-bold text-[#072C29]">{fundData.proj_abbr_name}</h2>
                ) : (
                  <div className="animate-pulse space-y-6 py-1 pb-2">
                    <div className="2xl:h-3 h-2 w-72 bg-[#d1d6df] rounded"></div>
                    <div className="2xl:h-2 h-1.5 w-96 bg-[#d1d6df] rounded"></div>
                  </div>
                )}
                <span className='py-1 text-gray-400 text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]'>{fundData?.proj_name_th}</span>
              </div>
              {fundData ? (
                <div className='flex flex-col items-end ml-auto'>
                  <span className='flex items-center px-2 text-[16px] md:text-[18px] lg:text-[20px] 2xl:text-[24px] font-bold text-[#072C29]'>
                    {status}
                    {fundData.dailyval && fundData.dailyval !== 0 ? parseFloat(fundData.dailyval).toFixed(4) : '-'}
                  </span>
                  <span className={`px-2 text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] font-semibold ${number?.includes('-') ? "text-[#ef5350]" : "text-[#00bc91]"}`}>{number === '0' ? <span className='text-gray-500'>+0.00</span> : number}</span>
                </div>
              ): (
                <div className='animate-pulse flex flex-col space-y-4 items-end ml-auto py-2'>
                  <div className="2xl:h-3 h-2 w-28 bg-[#d1d6df] rounded"></div>
                  <div className="2xl:h-2 h-1.5 w-20 bg-[#d1d6df] rounded"></div>
                </div>
              )}
            </div>
            <div className='flex'>
              <div className='pb-1 pt-5 flex items-center space-x-6'>
                <button onClick={handleFavorite}><Favorite showFavorite={favorite} /></button>
                <Compare fund={fund} />
              </div>
              {fundData && (
                <div className='ml-auto'>
                {fundData.Allinfo.nav && fundData.Allinfo.nav.NAV && fundData.Allinfo.nav.NAV.length !== 0 && fundData.Allinfo.nav.NAV[0].length > 2 && fundData.dailydate && fundData.dailydate !== '-' && <span className='flex justify-end px-2 py-1 text-gray-400 text-end text-[9px] md:text-[10px] lg:text-[11px] 2xl:text-[15px]'>(เปรียบเทียบกับ 5 วันก่อนหน้า)</span>}
                <span className='flex items-center justify-end px-2 py-2 text-gray-400 text-[9px] md:text-[10px] lg:text-[11px] 2xl:text-[15px]'><Clock className='w-[9px] md:w-[10px] lg:w-[11px] 2xl:w-[15px] mt-[-2px] mr-1'/>{fundData.dailydate}</span>
              </div>
              )}
            </div>
          </div>
        </div>
        <Detail fund={fund} />
      </div>
      {checkFunds && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <div className="bg-white flex flex-col items-center py-8 px-16 space-y-6 rounded-md shadow-md relative">
            <p className="text-[16px] text-[18px] lg:text-[20px] font-bold">ไม่มีกองทุนในระบบ</p>
            <p className="pb-1 text-[12px] lg:text-[16px]">โปรดเลือกกองทุนก่อน</p>
            <a href="/fund">
              <button className={`px-5 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white text-[12px] text-[14px] lg:text-[16px] font-semibold shadow-md `}
                style={{ whiteSpace: 'nowrap' }}
              >
                ตกลง
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default FundDetailPage;