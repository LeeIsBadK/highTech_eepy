import { useState, useEffect } from 'react';
import Sidebar from '../Components/sidebar';
import SearchBar from '../Components/search';
import Fund from '../Components/fund';
import Favorite from '../fundDetailComponent/favorite';
import { useLocation } from 'react-router-dom';
import Detail from '../fundDetailComponent/detail';
import { ChevronLeft, Clock, Triangle } from 'lucide-react';
import Compare from '../fundDetailComponent/compare';

interface Fund {
    id: number;
    name: string;
    detail: string;
    href: string;
    risk: number;
    type: string;
    value: number;
    returns: number;
  }
  
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


const FundDetailPage: React.FC = () => {
  const location = useLocation();
  const [fund, setFund] = useState<string>('');

  useEffect(() => {
    const url = location.pathname; // Get the current pathname from the location object
    setFund(url.split('/fund/')[1]); // Extract the data after '/fund/' from the URL
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
              <div className="grid grid-cols-4 gap-x-10 items-center">
                <h2 className="flex items-center sm:text-[22px] md:text-[26px] lg:text-[32px] font-bold tracking-tight text-[#072C29]"><a href='/fund'><ChevronLeft size={36} className='mr-4'/></a>รายละเอียดกองทุน</h2>
                <div className="col-span-2 ml-auto mr-auto">
                  <SearchBar funds={fundData as Fund[]}/>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-6 py-6 sm:px-6 lg:px-8 bg-white shadow-md rounded-[10px]">
              <div className='px-2 w-full'>
                <div className='flex'>
                  <div>
                    <h2 className="text-[23px] py-1 font-bold text-[#072C29]">{fund}</h2>
                    <span className='py-1 text-gray-400 text-[18px]'>กองทุนเปิด แอสเซทพลัส ดิจิทัล บล็อกเชน เพื่อการออม</span>
                  </div>
                  <div className='flex flex-col items-end ml-auto'>
                    <span className='flex items-center px-2 text-[24px] font-bold text-[#072C29]'><Triangle fill='#00bc91' size={18} className='text-[#00bc91] mr-[7px] mt-[-4px]'/>8.4301</span>
                    <span className='px-2 text-[18px] font-semibold text-[#00bc91]'>+ 0.9027</span>
                  </div>
                </div>
                <div className='flex'>
                  <div className='pb-1 pt-5 flex space-x-6'>
                    <Favorite />
                    <Compare fund={fund} />
                  </div>
                  <span className='flex ml-auto items-center pt-5 px-2 py-1 text-[16px] text-gray-400'><Clock size={18} className='mr-[6px]'/> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
                </div>
              </div>
            </div>
            <Detail selectedFundArray={[fund]} />
          </div>
        </div>
      );
}

export default FundDetailPage;