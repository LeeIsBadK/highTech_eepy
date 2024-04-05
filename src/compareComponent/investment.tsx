import { X } from "lucide-react";
import DoughNutChart from "./doughnutChart";
import { useEffect, useState } from "react";
import axios from "axios";

interface OverviewProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}

const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const Investment = ({ funds, generateDeleteFundUrl }: OverviewProps) => {
  const [status, setStatus] = useState<string>('TOP 5 Holding');
  const [topFiveData, setTopFiveData] = useState<Array<any> | null>(null);
  const [typeData, setTypeData] = useState<Array<any> | null>(null);
  const [investmentData, setInvestmentData] = useState<Array<any> | null>(null);
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
        if (!topFiveData && !typeData && !investmentData && funds.length !== 0) {
          const topFive = funds.map(async (fund) => {
            const response = await apiClient.get('/page3/topfive/' + fund);
            return response.data[0];
          });
          const type = funds.map(async (fund) => {
            const response = await apiClient.get('/page3/type/' + fund);
            return response.data[0];
          });
          const investment = funds.map(async (fund) => {
            const response = await apiClient.get('/page3/investment/' + fund);
            return response.data[0];
          });

          const dataForTopFive = await Promise.all(topFive);
          const dataForType = await Promise.all(type);
          const dataForInvestment = await Promise.all(investment);
          setTopFiveData(dataForTopFive);
          setTypeData(dataForType);
          setInvestmentData(dataForInvestment);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForAllFunds();
  }, [topFiveData, typeData, investmentData, funds]);


  return (
    <div className="pb-[60px] px-2">
      <div className="flex py-4 text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]">
        <button className={`${status === 'TOP 5 Holding' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('TOP 5 Holding')}>TOP 5 Holding</button>
        <button className={`${status === 'กลุ่มประเภทของหุ้นที่ลงทุน' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('กลุ่มประเภทของหุ้นที่ลงทุน')}>กลุ่มประเภทของหุ้นที่ลงทุน</button>
        <button className={`${status === 'สัดส่วนการลงทุน' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('สัดส่วนการลงทุน')}>สัดส่วนการลงทุน</button>
      </div>
      {!topFiveData && !typeData && !investmentData && (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <div className="flex items-center py-2 px-4 border border-transparent text-[13px] md:text-[15px] lg:text-[17px] font-medium rounded-md shadow-md text-gray-600 bg-gray-200">
            <svg className="animate-spin -ml-1 mr-[10px] h-[22px] w-[22px] text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            กำลังโหลดข้อมูล...
          </div>
        </div>
      )}
      {status === 'TOP 5 Holding' && (
        <div className="flex overflow-x-auto px-4 pt-4">
          {topFiveData?.map((fund) => (
            <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[300px]">
              <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-4 px-3 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} min-h-[775px] border border-gray-300 rounded-[10px] text-[8px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] text-gray-600 px-5 shadow-md w-full`}>
                {Object.keys(fund.top_five_holding).length !== 0 ? (
                  <div>
                    <div className="flex justify-center p-4"><DoughNutChart allData={fund.top_five_holding} /></div>
                    {Object.keys(fund.top_five_holding).map((key, index) => (
                      <p key={key} className="flex py-4 px-3">
                        <div><div className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                        <div className='px-2 flex flex-col'>
                          <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{fund.top_five_holding[key]} %</span>
                          <span className="min-h-[50px]">{key}</span>
                        </div>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {status === 'กลุ่มประเภทของหุ้นที่ลงทุน' && (
        <div className="flex overflow-x-auto px-4 pt-4">
          {typeData?.map((fund) => (
            <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[300px]">
              <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-4 px-3 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} min-h-[775px] border border-gray-300 rounded-[10px] text-[8px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] text-gray-600 px-5 shadow-md w-full`}>
                {Object.keys(fund.type_data).length !== 0 ? (
                  <div>
                    <div className="flex justify-center p-4"><DoughNutChart allData={fund.type_data} /></div>
                    {Object.keys(fund.type_data).map((key, index) => (
                      <p key={key} className="flex py-4 px-3">
                        <div><div className={`w-[12px] h-[12px] md:w-[14px] md:h-[14px] flex items-center mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                        <div className='px-2 flex flex-col'>
                          <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{fund.type_data[key]} %</span>
                          <span className="min-h-[50px]">{key}</span>
                        </div>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {status === 'สัดส่วนการลงทุน' && (
        <div className="flex overflow-x-auto px-4 pt-4">
          {investmentData?.map((fund) => (
            <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[300px]">
              <div className="py-4 px-2 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">
                <span className={`flex justify-center items-center w-full py-4 px-3 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 py-0.5 px-1.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="text-gray-400" /></a></span>
              </div>
              <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} min-h-[775px] border border-gray-300 rounded-[10px] text-[8px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] text-gray-600 px-5 shadow-md w-full`}>
                {Object.keys(fund.Investment_proportion_data).length !== 0 ? (
                  <div>
                    <div className="flex justify-center p-4"><DoughNutChart allData={fund.Investment_proportion_data} /></div>
                    {Object.keys(fund.Investment_proportion_data).map((key, index) => (
                      <p key={key} className="flex py-4 px-3">
                        <div><div className={`w-[14px] h-[14px] md:w-[16px] md:h-[16px] flex items-center mt-[6px] mr-1 md:mr-2`} style={{ backgroundColor: backgroundColor[index], borderRadius: '50%' }}></div></div>
                        <div className='px-2 flex flex-col'>
                          <span className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">{fund.Investment_proportion_data[key]} %</span>
                          <span className="min-h-[50px]">{key}</span>
                        </div>
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Investment;