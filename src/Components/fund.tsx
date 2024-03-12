import {riskColor} from "../assets/color";

const Fund = ({funds}: { funds: Array<any> }) => {
    return (
        <div className=""
          style={{
            fontFamily: "'Noto Sans Thai', sans-serif",
          }}
        >
          <div className="max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="p-5 rounded-[15px] bg-white mb-10">
              <span className="px-3 text-[20px] font-bold text-[#999999]">Sort:</span>
            </div>
            <div className="w-full bg-white p-8 rounded-[15px]">
              <div className="w-full h-full flex py-2">
                <p className="text-md font-medium text-[#999999] w-[19vw]">FUNDS</p>
                <p className="text-md font-medium text-[#999999] px-5">RISK</p>
                <p className="text-md font-medium text-[#999999] px-5">TAGS</p>
                <p className="text-md font-medium text-[#999999] ml-auto">NAV</p>
              </div>
              <div className="grid grid-cols-1 gap-y-0">
                {funds.map((fund) => (
                  <div key={fund.id} className="group relative flex border-b py-3">
                    <div className="h-full w-full flex justify-between">
                      <div className="w-full">
                        <div className="w-full flex items-center">
                          <h3 className="flex items-start w-[19vw] text-[17px] font-semibold text-[#072C29]">
                            <a href={fund.href}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {fund.name}
                            </a>
                          </h3> 
                          <div className={`px-[18px]`}>
                            <p className={`text-[20px] font-semibold px-[11px] py-[2px] border border-2  rounded-md`} style={{color:`${riskColor[fund.risk]}`,borderColor:`${riskColor[fund.risk]}`}}>{fund.risk}</p>
                          </div>
                          <div className="px-5">
                            <p className="px-[11px] py-[2px] border border-[#999999] border-[2px] rounded-md  items-center text-[20px] font-semibold text-[#999999]">{fund.type}</p>
                          </div>
                          <p className="text-[17px] font-semibold text-[#072C29] ml-auto">{fund.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
};

export default Fund;
