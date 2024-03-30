import { Clock, X } from 'lucide-react';

interface OperatingResultsProps {
  funds: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}


const OperatingResults = ({ funds, generateDeleteFundUrl }: OperatingResultsProps) => {
  return (
    <div className="pb-[60px] px-4">
      <div className="flex">
        <div className="pr-[80px]"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div className="py-8 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">Funds</div>
          <div className="sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600">
            <p className="py-6">3M</p>
            <p className="py-6">6M</p>
            <p className="py-6">1Y</p>
            <p className="py-6">3Y</p>
            <p className="py-6">5Y</p>
            <p className="py-6">10Y</p>
          </div>
        </div>
        <div>
          <div className="flex overflow-x-auto">
            {funds?.map((fund) => (
              <div key={fund} className="flex flex-col items-center mr-2 ml-2 min-w-[250px]"
                style={{ whiteSpace: 'nowrap' }}
              >
                <div className="py-4 px-2 font-bold sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#072C29]">
                  <span className={`flex justify-center w-full py-4 px-3 rounded-[10px]`}>{fund}<a href={generateDeleteFundUrl(fund)}><X className="mt-[3px] ml-1 text-gray-400" /></a></span>
                </div>
                <div className={`${funds.indexOf(fund) % 2 === 0 ? 'bg-[#fdfdfd]' : 'bg-[#f9f9f9]'} border border-gray-300 rounded-[10px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-gray-600 px-5 shadow-md w-full`}>
                  <p className="flex justify-center p-4 py-6">-</p>
                  <p className="flex justify-center p-4 py-6">-</p>
                  <p className="flex justify-center p-4 py-6">-</p>
                  <p className="flex justify-center p-4 py-6">-</p>
                  <p className="flex justify-center p-4 py-6">-</p>
                  <p className="flex justify-center p-4 py-6">-</p>
                </div>
              </div>
            ))}
          </div>
          <span className='flex items-center px-2 py-5 pb-11 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] text-[#7c8594]'><Clock size={18} className='mr-[6px]' /> ข้อมูล ณ วันที่ 20 มี.ค. 2567</span>
        </div>
      </div>
    </div>
  );
};

export default OperatingResults;