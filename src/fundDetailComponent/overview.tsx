import axios from "axios";
import { BookText, ChevronRight, ClipboardPenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface OverviewProps {
  fund: string;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const OverView = ({ fund }: OverviewProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fundData, setFundData] = useState<any | null>(null);

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

  const numberWithCommas = (number:number) => {
    return number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="pb-[50px] pt-[45px]">
      <div className="grid grid-cols-7 gap-x-0 px-8 py-6 bg-[#eaeaea] rounded-[10px] shadow-md">
        <span className="flex items-center font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">ผลตอบแทน</span>
        {fundData ? (
          <div className="grid grid-cols-3 col-start-3 col-span-3">
            <span className={`${ (fundData.fund_resYTD["3_month"] && fundData.fund_resYTD["3_month"].includes('-')) ? 'text-[#ef5350]' : 'text-[#00bc91]'} flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] font-bold items-center`}>
              {fundData.fund_resYTD["3_month"] && fundData.fund_resYTD["3_month"] !== '-' ? parseFloat(fundData.fund_resYTD["3_month"]).toFixed(2) + '%' : <span className="text-[#072C29]">-</span>}
              <p className="pt-2 text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">3M</p>
            </span>
            <span className={`${(fundData.fund_resYTD["6_month"] && fundData.fund_resYTD["6_month"].includes('-')) ? 'text-[#ef5350]' : 'text-[#00bc91]'} flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] font-bold items-center border-x border-gray-400`} >
              {(fundData.fund_resYTD["6_month"] && fundData.fund_resYTD["6_month"] !== '-' ) ? parseFloat(fundData.fund_resYTD["6_month"]).toFixed(2) + '%' : <span className="text-[#072C29]">-</span>}
              <p className="pt-2 text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">6M</p>
            </span>
            <span className={`${fundData.fund_resYTD["1_year"] && fundData.fund_resYTD["1_year"].includes('-') ? 'text-[#ef5350]' : 'text-[#00bc91]'} flex flex-col text-[13px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] font-bold items-center`}>
              {(fundData.fund_resYTD["1_year"] && fundData.fund_resYTD["1_year"] !== '-' ) ? parseFloat(fundData.fund_resYTD["1_year"]).toFixed(2) + '%' : <span className="text-[#072C29]">-</span>}
              <p className="pt-2 text-[11px] lg:text-[13px] 2xl:text-[17px] text-[#072C29] font-normal">1Y</p>
            </span>
          </div>
        ) : (
          <div className="col-start-3 col-span-3 flex justify-center items-center w-full h-[72px]">
            <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
              <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังโหลดข้อมูล...
            </div>
          </div>
        )}
        <button className="col-start-7 flex items-center ml-auto font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]" onClick={() => navigate('/detail/performance/' + fund, { state: { from: location }, replace: true })}>
          ดูทั้งหมด
          <ChevronRight className="mt-[1px] 2xl:w-[24px] 2xl:h-[24px] lg:w-[20px] lg:h-[20px] md:w-[18px] md:h-[18px] w-[16px] h-[16px]" />
        </button>
      </div>
      <div className="px-4 pt-14 pb-4">
        <span className="flex font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#072C29]">
          <ClipboardPenLine size={26} className="mr-2 mt-[2px] 2xl:w-[26px] 2xl:h-[26px] lg:w-[22px] lg:h-[22px] md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
          รายละเอียดกองทุน
        </span>
      </div>
      {fundData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-3 py-5 bg-white rounded-[10px] shadow-md">
          <div className="py-1 px-8 w-full text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] border-hidden lg:border-r lg:border-dashed lg:border-gray-400">
            <div className="grid grid-cols-2"><p className="p-4">หนังสือชี้ชวน</p>
              {fundData.Allinfo.feeHolders.fund_fact_url ? (
                <a href={fundData.Allinfo.feeHolders.fund_fact_url} target="_blank" rel="noopener noreferrer" className="ml-auto flex p-4"><p className="flex items-center py-1.5 px-3 rounded-[15px] bg-gray-200"><BookText className="w-[10px] md:w-[12px] lg:w-[14px] 2xl:w-[18px]" />หนังสือชี้ชวน</p></a>
              ): (
                <p className="ml-auto p-4">-</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">บลจ</p><p className="ml-auto text-end p-4">{fundData.companyTH}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ประเภทกอง</p><p className="ml-auto text-end p-4">{fundData.fundType.join(', ')}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าความเสี่ยง</p><p className="flex ml-auto text-end p-4">{fundData.risk_spectrum === '-' ? '-' : fundData.risk_spectrum.replace(/\D/g, '') === '81' ? '8+' : fundData.risk_spectrum.replace(/\D/g, '')}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">Feeder Fund</p><p className="ml-auto text-end p-4">{fundData.Allinfo.feeder_fund}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">นโยบายค่าเงิน</p><p className="ml-auto text-end p-4">{fundData.Allinfo.money_policy.length > 60 ? fundData.Allinfo.money_policy.substring(0, 60) + "..." : fundData.Allinfo.money_policy}</p></div>
            <div className="grid grid-cols-2"><p className="p-4 pb-1">นโยบายการจ่ายปันผล</p><p className="ml-auto text-end p-4 pb-1">{fundData.Allinfo.dividen_policy}</p></div>
          </div>
          <div className="py-1 px-8 w-full text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]">
            <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมขาย</p><p className="ml-auto text-end p-4">{fundData.Allinfo.feeHolders.front_end_fee[1]}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมรับซื้อคืน</p><p className="ml-auto text-end p-4">{fundData.Allinfo.feeHolders.back_end_fee[1]}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าใช้จ่ายกองทุนรวม</p><p className="ml-auto text-end p-4">{fundData.Allinfo.feefunds[1]}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งแรกขั้นต่ำ</p><p className="ml-auto text-end p-4">{fundData.Allinfo.buyInfo.การซื้อครั้งแรกขั้นต่ํา}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งต่อไปขั้นต่ำ</p><p className="ml-auto text-end p-4">{fundData.Allinfo.buyInfo.การซื้อครั้งถัดไปขั้นต่ํา}</p></div>
            <div className="grid grid-cols-2"><p className="p-4">วันที่จดทะเบียนกองทุน</p><p className="ml-auto text-end p-4">-</p></div>
            <div className="grid grid-cols-2"><p className="p-4">มูลค่าทรัพย์สินสุทธิ</p><p className="ml-auto text-end p-4">{fundData.dailynet && fundData.dailynet !== 0 ? numberWithCommas(fundData.dailynet) : '-'}</p></div>
          </div>
        </div>
      ) : (
        <div className="col-start-3 col-span-3 flex justify-center items-center w-full h-[50vh]">
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
  );
};

export default OverView;