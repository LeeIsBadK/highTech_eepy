import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface OperatingResultsProps {
  funds: Array<any>;
  generateDeleteFundUrl: (fund: string) => string;
}


const apiClient = axios.create({
  baseURL: 'https://backend-ruby-eight.vercel.app',
});

const OperatingResults = ({ funds, generateDeleteFundUrl }: OperatingResultsProps) => {
  const [fundData, setFundData] = useState<Array<any> | null>(null);
  const [status, setStatus] = useState<string>('Performance');

  useEffect(() => {
    const fetchDataForAllFunds = async () => {
      try {
        // Check if fundData is null before fetching the data
        if (!fundData && funds.length !== 0) {
          const promises = funds.map(async (fund) => {
            const response = await apiClient.get('/page2/' + fund);
            return response.data[0];
          });

          const dataForAllFunds = await Promise.all(promises);
          setFundData(dataForAllFunds);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataForAllFunds();
  }, [fundData, funds]);

  return (
    <div className="pb-[60px] px-4">
      <div className="flex pt-4 pb-10 text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px]">
        <button className={`${status === 'Performance' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('Performance')}>Performance</button>
        <button className={`${status === 'Standrad Deviation' ? "text-[#072C29] font-bold underline" : "text-gray-600 font-semibold"} px-2 xl:px-4 hover:bg-gray-200 rounded-[10px]`} onClick={() => setStatus('Standrad Deviation')}>Standrad Deviation</button>
      </div>
      <div className="flex">
        <div className="pr-[80px]"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="py-8 font-bold text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600">
            <p className="py-6">3M</p>
            <p className="py-6">6M</p>
            <p className="py-6">1Y</p>
            <p className="py-6">3Y</p>
            <p className="py-6">5Y</p>
            <p className="py-6">10Y</p>
          </div>
        </div>
        {fundData && status === 'Performance' && (
          <div className='overflow-x-auto'>
            <div className="flex overflow-x-auto">
              {fundData?.map((fund) => (
                <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[335px] max-w-[335px] min-h-[450px]"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <div className="py-4 px-2 font-bold text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]">
                    <span className={`flex justify-center items-center w-full py-5 px-2 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 px-0.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="w-[12px] md:w-[14px] lg:w-[16px] 2xl:w-[20px] text-gray-400" /></a></span>
                  </div>
                  <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                    {fund.operating_results.ผลตอบแทนกองทุนรวม ? (
                      <div>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['3_month'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['3_month']).toFixed(2)  + '%' : '-' } </p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['6_month'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['6_month']).toFixed(2) + '%' : '-'}</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['1_year'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['1_year']).toFixed(2) + '%' : '-'}</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['3_year'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['3_year']).toFixed(2) + '%' : '-'}</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['5_year'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['5_year']).toFixed(2) + '%' : '-'}</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ผลตอบแทนกองทุนรวม['10_year'] ? parseInt(fund.operating_results.ผลตอบแทนกองทุนรวม['10_year']).toFixed(2) + '%' : '-'}</p>
                      </div>
                    ) : (
                      <div className="w-full min-h-[450px] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {fundData && status === 'Standrad Deviation' && (
          <div className='overflow-x-auto'>
            <div className="flex overflow-x-auto">
              {fundData?.map((fund) => (
                <div key={fund.proj_abbr_name} className="flex flex-col items-center mr-2 ml-2 min-w-[335px] max-w-[335px] min-h-[450px]"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <div className="py-4 px-2 font-bold text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-[#072C29]">
                    <span className={`flex justify-center items-center w-full py-5 px-2 rounded-[10px]`}><a href={`/detail/${fund.proj_abbr_name}`} className='hover:bg-gray-200 px-0.5 rounded-[10px]'>{fund.proj_abbr_name}</a><a href={generateDeleteFundUrl(fund.proj_abbr_name)}><X className="w-[12px] md:w-[14px] lg:w-[16px] 2xl:w-[20px] text-gray-400" /></a></span>
                  </div>
                  <div className={`${funds.indexOf(fund.proj_abbr_name) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] text-[11px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                    {fund.operating_results.ความผันผวนของกองทุนรวม ? (
                      <div>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['3_month'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['3_month']).toFixed(2) + '%' : '-' }</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['6_month'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['6_month']).toFixed(2) + '%' : '-' }</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['1_year'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['1_year']).toFixed(2) + '%' : '-' }</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['3_year'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['3_year']).toFixed(2) + '%' : '-' }</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['5_year'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['5_year']).toFixed(2) + '%' : '-' }</p>
                        <p className="flex justify-center p-4 py-6">{fund.operating_results.ความผันผวนของกองทุนรวม['10_year'] ? parseInt(fund.operating_results.ความผันผวนของกองทุนรวม['10_year']).toFixed(2) + '%' : '-' }</p>
                      </div>
                    ) : (
                      <div className="w-full min-h-[450px] flex items-center justify-center text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[20px] font-semibold">ไม่มีข้อมูล</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {!fundData && (
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

export default OperatingResults;