import { Clock } from "lucide-react";
import DoughNutChart from "./doughnutChart";
import { useEffect, useState } from "react";
import axios from "axios";

interface OverviewProps {
  fund: string;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});


const Investment = ({ fund }: OverviewProps) => {
  const [topFiveData, setTopFiveData] = useState<any | null>(null);
  const [typeData, setTypeData] = useState<any | null>(null);
  const [investmentData, setInvestmentData] = useState<any | null>(null);
  const backgroundColor = [
    '#4BC0C0',
    '#36A2EB',
    '#FFCE56',
    '#FF6384',
    '#9966FF',
    '#808080',
  ]

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!topFiveData && !typeData && !investmentData && fund) {
          const topFive = await apiClient.get('/page3/topfive/' + fund);
          const type = await apiClient.get('/page3/type/' + fund);
          const investment = await apiClient.get('/page3/investment/' + fund);

          setTopFiveData(topFive.data[0]);
          setTypeData(type.data[0]);
          setInvestmentData(investment.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForAllFunds();
  }, [topFiveData, typeData, investmentData, fund]);

  return (
    <div className="py-2 px-8">
      {topFiveData && typeData && investmentData ? (
        <div>
          <div className="py-4 px-4 text-[12px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
            <span className={`w-full py-4 rounded-[10px] font-bold`}>TOP 5 Holding</span>
          </div>
          <div className={`py-4 bg-white rounded-[10px] text-[12px] lg:text-[16px] 2xl:text-[20px] text-gray-700 px-5 shadow-md w-full`}>
            {Object.keys(topFiveData.top_five_holding).length !== 0 ? (
              <div className="grid grid-cols-2">
                <div className="flex justify-center p-4"><DoughNutChart allData={topFiveData.top_five_holding} /></div>
                {Object.keys(topFiveData.top_five_holding).map((key, index) => (
                  <p key={key} className="flex py-4 px-3">
                    <div><div className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] flex items-center mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                    <div className='px-2 flex flex-col'>
                      <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{topFiveData.top_five_holding[key]} %</span>
                      <span className="min-h-[50px]">{key}</span>
                    </div>
                  </p>
                ))}
              </div>
            ) : (
              <div className="w-full h-[30vh] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
            )}
          </div>
          <div className="py-4 px-4 pt-14 text-[12px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
            <span className={`w-full py-4 rounded-[10px] font-bold`}>สัดส่วนการลงทุน</span>
          </div>
          <div className={`py-4 bg-white rounded-[10px] text-[12px] lg:text-[16px] 2xl:text-[20px] text-gray-700 px-5 shadow-md w-full`}>
            {Object.keys(typeData.type_data).length !== 0 ? (
              <div className="grid grid-cols-2">
                <div className="flex justify-center p-4"><DoughNutChart allData={typeData.type_data} /></div>
                {Object.keys(typeData.type_data).map((key, index) => (
                  <p key={key} className="flex py-4 px-3">
                    <div><div className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] flex items-center mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                    <div className='px-2 flex flex-col'>
                      <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{typeData.type_data[key]} %</span>
                      <span className="min-h-[50px]">{key}</span>
                    </div>
                  </p>
                ))}
              </div>
            ) : (
              <div className="w-full h-[30vh] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
            )}
          </div>
          <div className="py-4 px-4 pt-14 text-[12px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
            <span className={`w-full py-4 rounded-[10px] font-bold`}>กลุ่มประเภทตราสารทุน/ตราสารหนี้ที่ลงทุน</span>
          </div>
          <div className={`py-4 bg-white rounded-[10px] text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-gray-700 px-5 shadow-md w-full`}>
            {Object.keys(investmentData.Investment_proportion_data).length !== 0 ? (
              <div className="grid grid-cols-2">
                <div className="flex justify-center p-4"><DoughNutChart allData={investmentData.Investment_proportion_data} /></div>
                {Object.keys(investmentData.Investment_proportion_data).map((key, index) => (
                  <p key={key} className="flex py-4 px-3">
                    <div><div className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] flex items-center mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                    <div className='px-2 flex flex-col'>
                      <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{investmentData.Investment_proportion_data[key]} %</span>
                      <span className="min-h-[50px]">{key}</span>
                    </div>
                  </p>
                ))}
              </div>
            ) : (
              <div className="w-full h-[30vh] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
            )}
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

export default Investment;