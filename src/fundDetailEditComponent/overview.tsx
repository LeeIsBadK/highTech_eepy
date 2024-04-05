import axios from "axios";
import { BookText, ClipboardPenLine, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";

interface OverviewProps {
  fund: string;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const OverView = ({ fund }: OverviewProps) => {
  const [fundData, setFundData] = useState<any | null>(null);
  const [fundDataCopy, setFundDataCopy] = useState<any | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!fundData && fund) {
          const response = await apiClient.get('/detail/' + fund);
          setFundData(response.data[0]);
          setFundDataCopy(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForAllFunds();
  }, [fundData, fund, fundDataCopy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = e.target.value;
    setFundData((prevFundData: any) => ({
      ...prevFundData,
      [key]: value,
    }));
  };

  const handleConfirm = () => {
    setConfirm(true);
  }

  return (
    <div className="pb-[50px] pt-[45px]">
      <div className="px-4 pt-14 pb-4">
        <span className="flex font-bold text-[14px] md:text-[16px] lg:text-[18px] 2xl:text-[22px] text-[#072C29]">
          <ClipboardPenLine size={26} className="mr-2 mt-[2px] 2xl:w-[26px] 2xl:h-[26px] lg:w-[22px] lg:h-[22px] md:w-[20px] md:h-[20px] w-[18px] h-[18px]" />
          รายละเอียดกองทุน
          {fundData && <button onClick={() => { setEdit(!edit); setFundDataCopy(fundData); }}><PencilLine className="text-[#ef5350] ml-3 mt-[2px] 2xl:w-[26px] 2xl:h-[26px] lg:w-[22px] lg:h-[22px] md:w-[20px] md:h-[20px] w-[18px] h-[18px]" /></button>}
        </span>
      </div>
      {fundData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full px-3 py-5 bg-white rounded-[10px] shadow-md">
          <div className="py-1 px-8 w-full text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] border-hidden lg:border-r lg:border-dashed lg:border-gray-400">
            <div className="grid grid-cols-2"><p className="p-4">หนังสือชี้ชวน</p>
              {fundData.Allinfo.feeHolders.fund_fact_url ? (
                <a href={fundData.Allinfo.feeHolders.fund_fact_url} target="_blank" rel="noopener noreferrer" className="ml-auto flex p-4"><p className="flex items-center py-1.5 px-3 rounded-[15px] bg-gray-200"><BookText className="w-[10px] md:w-[12px] lg:w-[14px] 2xl:w-[18px]" />หนังสือชี้ชวน</p></a>
              ) : (
                <p className="ml-auto p-4">-</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">บลจ</p>
              {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.companyTH || '-'}
                  onChange={(e) => handleChange(e, 'companyTH')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.companyTH}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">ประเภทกอง</p>
              {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.fundType[0] || '-'}
                  onChange={(e) => handleChange(e, 'fundType[0]')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.fundType[0]}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าความเสี่ยง</p>
              {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.risk_spectrum || '-'}
                  onChange={(e) => handleChange(e, 'risk_spectrum')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="flex ml-auto text-end p-4">{fundData.risk_spectrum}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">Feeder Fund</p>
              {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.feeder_fund || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.feeder_fund')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.feeder_fund}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">นโยบายค่าเงิน</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.money_policy || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.money_policy')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.money_policy.length > 60 ? fundData.Allinfo.money_policy.substring(0, 60) + "..." : fundData.Allinfo.money_policy}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">นโยบายการจ่ายปันผล</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.dividen_policy || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.dividen_policy')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4 pb-1">{fundData.Allinfo.dividen_policy}</p>
              )}
            </div>
          </div>
          <div className="py-1 px-8 w-full text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]">
            <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมขาย</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.feeHolders.front_end_fee[1] || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.feeHolders.front_end_fee[1]')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.feeHolders.front_end_fee[1]}</p>
              )}
              </div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าธรรมเนียมรับซื้อคืน</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.feeHolders.back_end_fee[1] || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.feeHolders.back_end_fee[1]')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.feeHolders.back_end_fee[1]}</p>
              )}
           </div>
            <div className="grid grid-cols-2"><p className="p-4">ค่าใช้จ่ายกองทุนรวม</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.feefunds[1] || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.feefunds[1]')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.feefunds[1]}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งแรกขั้นต่ำ</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.buyInfo.การซื้อครั้งแรกขั้นต่ํา || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.buyInfo.การซื้อครั้งแรกขั้นต่ํา')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.buyInfo.การซื้อครั้งแรกขั้นต่ํา}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">ลงทุนครั้งต่อไปขั้นต่ำ</p>
            {edit ? (
                <input
                  type="text"
                  value={fundDataCopy.Allinfo.buyInfo.การซื้อครั้งถัดไปขั้นต่ํา || '-'}
                  onChange={(e) => handleChange(e, 'Allinfo.buyInfo.การซื้อครั้งถัดไปขั้นต่ํา')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.buyInfo.การซื้อครั้งถัดไปขั้นต่ํา}</p>
              )}
            </div>
            <div className="grid grid-cols-2"><p className="p-4">วันที่จดทะเบียนกองทุน</p>
            <p className="ml-auto p-4">-</p></div>
            <div className="grid grid-cols-2"><p className="p-4">มูลค่าทรัพย์สินสุทธิ</p>
            {edit ? (
                <input
                  type="text"
                  value={fundData.Allinfo.buyInfo.nav && fundData.Allinfo.buyInfo.nav.NAV ? fundData.Allinfo.buyInfo.nav.NAV[10][2] : '-'}
                  onChange={(e) => handleChange(e, 'cAllinfo.buyInfo.nav.NAV[10][2]')}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className="ml-auto text-end p-4">{fundData.Allinfo.buyInfo.nav && fundData.Allinfo.buyInfo.nav.NAV ? fundData.Allinfo.buyInfo.nav.NAV[10][2] : '-'}</p>
              )}
            </div>
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
      {edit && (
        <div className="w-full flex justify-end py-6 px-7">
        <button onClick={handleConfirm} className='flex items-center justify-center py-2 px-6 border border-transparent md:text-[16px] text-[14px] lg:text-[18px] font-medium rounded-md shadow-md text-white bg-gradient-to-tr from-[#00f7e7] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] focus:outline-none'>
          {confirm && (
            <svg className="animate-spin -ml-2 mr-[10px] h-[22px] w-[22px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          ยืนยัน
        </button>
      </div>
      )}
    </div>
  );
};

export default OverView;