import axios from 'axios';
import { BookText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface OverviewProps {
  funds: Array<any>;
  generateDeleteFundUrl: (fund: string) => string;
}


const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const OverView = ({ funds, generateDeleteFundUrl }: OverviewProps) => {
  const [fundData, setFundData] = useState<Array<any> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!fundData && funds.length !== 0) {
          const promises = funds.map(async (fund) => {
            const response = await apiClient.get('/page1/' + fund);
            return response.data;
          });

          const dataForAllFunds = await Promise.all(promises);
          setFundData(dataForAllFunds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/missing', { state: { from: location }, replace: true });
      }
    };

    fetchDataForAllFunds();
  }, [fundData, funds]);

  const numberWithCommas = (number:number) => {
    return number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="pb-[50px]">
      <div className="flex">
        <div className="pr-[43px] pt-0.5 md:pt-1.5 lg:pt-0"
          style={{ whiteSpace: 'nowrap' }}>
          <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
            <span className={`flex items-center w-full py-5 px-2 rounded-[10px]`}>Funds</span>
          </div>
          <div className="grid grid-rows-8 py-1 text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className="py-4 px-3">หนังสือชี้ชวน</p>
            <p className="row-span-2 py-[26px] md:py-[22px] lg:py-4 px-3">บลจ</p>
            <p className="py-4 px-3">ประเภทกอง</p>
            <p className="py-4 px-3">ค่าความเสี่ยง</p>
            <p className="py-4 px-3">Feeder Fund</p>
            <p className="py-4 px-3">นโยบายค่าเงิน</p>
            <p className="py-4 px-3">นโยบายการจ่ายปันผล</p>
          </div>
        </div>
        {fundData ? (
          <div className="flex overflow-x-auto">
            {fundData?.map((fund) => (
              <div key={fund.proj_abbr_name} className="mr-2 ml-2 min-w-[240px] max-w-[240px] lg:min-w-[275px] lg:max-w-[275px] xl:min-w-[335px] xl:max-w-[335px]"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="py-4 px-2 font-bold text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]">
                  <span className={`flex justify-center items-center w-full py-5 px-2 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 px-0.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="w-[12px] md:w-[14px] lg:w-[16px] 2xl:w-[20px] text-gray-400" /></a></span>
                </div>
                <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} grid grid-rows-8 border border-gray-300 rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 py-1 shadow-md w-full`}>
                  <a href={fund.compareinfomation.feeHolders.fund_fact_url} target="_blank" rel="noopener noreferrer" className='flex justify-center p-2'><p className="flex justify-center items-center py-0.5 lg:py-1 xl:py-1.5 px-2 rounded-[15px] text-[11px] lg:text-[13px] 2xl:text-[17px] bg-gray-200 font-semibold"><BookText className='w-[9px] md:w-[11px] lg:w-[13px] 2xl:w-[17px] mr-1' />หนังสือชี้ชวน</p></a>
                  <p className="flex justify-center text-center py-4 px-3 whitespace-normal row-span-2 leading-7">{fund.compareinfomation.companyTH}</p>
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.fundType[0]}</p>
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.risk === '-' ? '-' : fund.compareinfomation.risk.replace(/\D/g, '') === '81' ? '8+' : fund.compareinfomation.risk.replace(/\D/g, '')} </p>
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.feeder_fund.length > 27 ? fund.compareinfomation.feeder_fund.substring(0, 25) + "..." : fund.compareinfomation.feeder_fund}</p>
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.money_policy.length > 27 ? fund.compareinfomation.money_policy.substring(0, 27) + "..." : fund.compareinfomation.money_policy}</p>
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.dividen_policy}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
              <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังโหลดข้อมูล...
            </div>
          </div>
        )}
      </div>
      <div className="flex">
        <div className="pr-10 pt-0.5 md:pt-1.5 lg:pt-0"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="px-4 py-9 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="grid grid-rows-7 py-1 text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className="py-4 px-3">ค่าธรรมเนียมขาย</p>
            <p className="py-4 px-3">ค่าธรรมเนียมรับซื้อคืน</p>
            <p className="py-4 px-3">ค่าใช้จ่ายกองทุนรวม</p>
            <p className="py-4 px-3">ลงทุนครั้งแรกขั้นต่ำ</p>
            <p className="py-4 px-3">ลงทุนครั้งต่อไปขั้นต่ำ</p>
            <p className="py-4 px-3">วันที่จดทะเบียนกองทุน</p>
            <p className="py-4 px-3">มูลค่าทรัพย์สินสุทธิ</p>
          </div>
        </div>
        {fundData ? (<div className="flex overflow-x-auto">
          {fundData?.map((fund) => (
            <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[240px] max-w-[240px] lg:min-w-[275px] lg:max-w-[275px] xl:min-w-[335px] xl:max-w-[335px]"
              style={{ whiteSpace: 'nowrap' }}
            >
              <div className="py-4 px-2 font-bold text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-5 px-2 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 px-0.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="w-[12px] md:w-[14px] lg:w-[16px] 2xl:w-[20px] text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} grid grid-rows-7 py-1 border border-gray-300 rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                {fund.compareinfomation.feeHolders.front_end_fee[1] === 'ยกเว้น' ? (
                  <p className="flex justify-center py-4 px-3">0.00 % ต่อปี</p>
                ) : (
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.feeHolders.front_end_fee[1] === '-' ? '-' : fund.compareinfomation.feeHolders.front_end_fee[1] + '%'}</p>
                )}
                {fund.compareinfomation.feeHolders.back_end_fee[1] === 'ยกเว้น' ? (
                  <p className="flex justify-center py-4 px-3">0.00 % ต่อปี</p>
                ) : (
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.feeHolders.back_end_fee[1] === '-' ? '-' : fund.compareinfomation.feeHolders.back_end_fee[1] + '%'} </p>
                )}
                {fund.compareinfomation.feeHolders.ttl_fee[1] === 'ยกเว้น' ? (
                  <p className="flex justify-center py-4 px-3">0.00 % ต่อปี</p>
                ) : (
                  <p className="flex justify-center py-4 px-3">{fund.compareinfomation.feeHolders.ttl_fee[1] === '-' ? '-' : parseFloat(fund.compareinfomation.feeHolders.ttl_fee[1]).toFixed(2) + "% ต่อปี"}</p>
                )}
                <p className="flex justify-center py-4 px-3">{fund.compareinfomation.buyInfo.การซื้อครั้งแรกขั้นต่ํา}</p>
                <p className="flex justify-center py-4 px-3">{fund.compareinfomation.buyInfo.การซื้อครั้งถัดไปขั้นต่ํา}</p>
                <p className="flex justify-center py-4 px-3">-</p>
                <p className="flex justify-center py-4 px-3">{fund.dailynet && fund.dailynet !== 0 ? numberWithCommas(parseFloat(fund.dailynet)) : '-'}</p>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <div className="flex justify-center items-center w-full h-[60vh]">
            <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
              <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังโหลดข้อมูล...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverView;