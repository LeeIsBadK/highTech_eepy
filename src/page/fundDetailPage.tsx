import { useState, useEffect } from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Favorite from '../fundDetailComponent/favorite';
import { useLocation, useNavigate } from 'react-router-dom';
import Detail from '../fundDetailComponent/detail';
import { ChevronLeft, Clock, Triangle } from 'lucide-react';
import Compare from '../fundDetailComponent/compare';
import { useLocalStorage } from '../loginComponent/hook/useLocalStorage';
import axios from 'axios';


export const fundData = [
  {
    id: 1,
    name: 'ASP-DIGIBLOC-SSF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการออม',
    href: '#',
    risk: 6,
    type: 'SSFEQ',
    value: 8.4301,
    returns: 138.70
  },
  {
    id: 2,
    name: 'ASP-DIGIBLOCRMF',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการเลี้ยงชีพ',
    href: '#',
    risk: 1,
    type: 'RMFEQ',
    value: 7.7214,
    returns: 130.12
  },
  {
    id: 3,
    name: 'ASP-DIGIBLOC',
    detail: 'กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน',
    href: '#',
    risk: 3,
    type: 'FIFEQ',
    value: 7.4037,
    returns: 125.88
  },
  {
    id: 4,
    name: 'LHBLOCKCHAIN',
    detail: 'กองทุนเปิด แอล เอช บล็อกเชน',
    href: '#',
    risk: 2,
    type: 'MIXFLEX',
    value: 9.8522,
    returns: 81.36
  },
  {
    id: 5,
    name: 'SCBSEMI(SSFE)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดเพื่อการออมผ่านช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 4,
    type: 'SSFEQ',
    value: 15.5487,
    returns: 77.20
  },
  {
    id: 6,
    name: 'SCBSEMI(E)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดช่องทางอิเล็กทรอนิกส์)',
    href: '#',
    risk: 5,
    type: 'RMFEQ',
    value: 15.7053,
    returns: 77.17
  },
  {
    id: 7,
    name: 'SCBSEMI(P)',
    detail: 'กองทุนเปิดไทยพาณิชย์ Semiconductor (ชนิดผู้ลงทุนกลุ่ม/บุคคล)',
    href: '#',
    risk: 7,
    type: 'FIFEQ',
    value: 15.2816,
    returns: 75.52
  },
  {
    id: 8,
    name: 'KT-BLOCKCHAIN-A',
    detail: 'กองทุนเปิดเคแทม Blockchain Economy (ชนิดสะสมมูลค่า)',
    href: '#',
    risk: 6,
    type: 'FIFEQ',
    value: 10.7280,
    returns: 73.10
  },
  {
    id: 9,
    name: 'TNEXTGEN-SSF',
    detail: 'กองทุนเปิด ทิสโก้ Next Generation Internet ชนิดหน่วยลงทุนเพื่อการออม',
    href: '#',
    risk: 8,
    type: 'SSFEQ',
    value: 6.5763,
    returns: 64.94
  },
  {
    id: 10,
    name: 'KKP TECH-H-SSF',
    detail: 'กองทุนเปิดเคเคพี EXPANDED TECH - HEDGED ชนิดเพื่อการออม',
    href: '#',
    risk: 1,
    type: 'SSFEQ',
    value: 15.1590,
    returns: 63.65
  }
]
const status = {
  "goUp": <Triangle fill='#00bc91' size={18} className='text-[#00bc91] mr-[7px] mt-[-4px] 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] sm:w-[10px] sm:h-[10px]' />,
  "goDown": <Triangle fill='#ef5350' size={18} className='text-[#ef5350] mr-[7px] mt-[-4px] 2xl:w-[18px] 2xl:h-[18px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px] md:w-[12px] md:h-[12px] sm:w-[10px] sm:h-[10px] rotate-180' />
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

  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/allpro');
        setAllFunds(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    const parts = url.split("/");
    const fund = parts[parts.length - 1];
    if (fund && (fund === 'performance' || fund === 'port' || fund === 'fee')) {
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
  }, [location.pathname]); // Run the effect whenever the pathname changes


  return (
    <div className="flex transition-all duration-500 ease-in-out"
      style={{
        fontFamily: "'Noto Sans Thai', sans-serif",
      }}
    >
      <Sidebar />
      <div className="w-full sm:px-12 px-16 pt-4 sm:pt-7 lg:pt-11 pb-4 sm:pb-8 lg:pb-12 items-center bg-[#f9f9f9] max-h-[100svh] overflow-y-auto">
        <div className='pb-4 mt-1 sm:pb-8 sm:mt-2 lg:pb-12'>
          <div className="grid grid-cols-4 gap-x-3.5 items-center">
            <h2 className="flex space-x-1.5 items-center sm:text-[15px] md:text-[19px] lg:text-[23px] xl:text-[27px] 2xl:text-[31px] font-bold tracking-tight text-[#072C29]">
              <button onClick={goBack}>
                <ChevronLeft size={36} className='2xl:w-9 2xl:h-9 xl:w-8 xl:h-8 lg:w-7 lg:h-7 md:w-6 md:h-6 sm:w-5 sm:h-5' />
              </button>
              รายละเอียดกองทุน
            </h2>
            <div className="col-span-2 ml-auto mr-auto">
              <SearchBar funds={allFunds} />
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6 py-6 sm:px-6 lg:px-8 bg-white shadow-md rounded-[10px]">
          <div className='px-2 w-full'>
            <div className='flex'>
              <div>
                <h2 className="sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] 2xl:text-[23px] py-1 font-bold text-[#072C29]">{fund}</h2>
                <span className='py-1 text-gray-400 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]'>กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการออม</span>
              </div>
              <div className='flex flex-col items-end ml-auto'>
                <span className='flex items-center px-2 sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-bold text-[#072C29]'>
                  {status.goUp}
                  8.4301
                </span>
                <span className='px-2 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-semibold text-[#00bc91]'>+ 0.9027</span>
              </div>
            </div>
            <div className='flex'>
              <div className='pb-1 pt-5 flex space-x-6'>
                <Favorite />
                <Compare fund={fund} />
              </div>
              <span className='flex ml-auto items-center pt-5 px-2 py-1 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-gray-400'><Clock size={18} className='mr-[6px]' /> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
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
            <p className="sm:text-[16px] md:text-[18px] lg:text-[20px] font-bold">ไม่มีกองทุนในระบบ</p>
            <p className="pb-1 sm:text-[12px] md:text-[14px] lg:text-[16px]">โปรดเลือกกองทุนก่อน</p>
            <a href="/fund">
              <button className={`px-5 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[12px] md:text-[14px] lg:text-[16px] font-semibold shadow-md `}
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