import { Coins, HandCoins, PieChart, ReceiptText } from "lucide-react"
import Investment from "./investment"
import ChartComponent from "./lineChart"
import OperatingResults from "./operatingResults"
import OverView from "./overview"
import { useState } from "react"
import Fee from "./fee"

interface DetailProps {
  selectedFundArray: Array<string>;
  generateDeleteFundUrl: (fund: string) => string;
}

const Detail = ({selectedFundArray, generateDeleteFundUrl}: DetailProps) => {
  const [selected,setSelected] = useState<string>('ภาพรวม');

    return (
      <div>
        <div className="flex items-center pt-7 sm:px-3 lg:px-5">
          <div className="border-b border-b-2 w-full">
            <button className={`${selected === 'ภาพรวม' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
                onClick={() => setSelected('ภาพรวม')}>
              <span className="flex items-center"><ReceiptText size={19} className="mr-[5px]" />ภาพรวม</span>
            </button>
            <button className={`${selected === 'ผลการดำเนินงานและปันผล' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
              onClick={() => setSelected('ผลการดำเนินงานและปันผล')}>
              <span className="flex items-center"><HandCoins size={19} className="mr-[5px]" />ผลการดำเนินงานและปันผล</span>
            </button>
            <button className={`${selected === 'พอร์ตการลงทุน' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
              onClick={() => setSelected('พอร์ตการลงทุน')}>
              <span className="flex items-center"><PieChart size={19} className="mr-[5px]" />พอร์ตการลงทุน</span>
            </button>
            <button className={`${selected === 'ค่าธรรมเนียม' ? 'font-bold bg-gray-300' : ''} px-5 py-1 text-[16px] rounded-[10px]`} 
                  onClick={() => setSelected('ค่าธรรมเนียม')}>
                  <span className="flex items-center"><Coins size={19} className="mr-[5px]" />ค่าธรรมเนียม</span>
            </button>
          </div>
        </div>
        <div className="h-full py-8 sm:px-6 lg:px-8">
          {selected === 'ภาพรวม' && (
            <div>
              <div className="pb-8 pt-2">
                <ChartComponent funds={selectedFundArray}/>
              </div>
              <OverView funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
            </div>
          )}
          {selected === 'ผลการดำเนินงานและปันผล' && (
            <OperatingResults funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
          )}
          {selected === 'พอร์ตการลงทุน' && (
            <Investment funds={selectedFundArray}  generateDeleteFundUrl={generateDeleteFundUrl} />
          )}
          {selected === 'ค่าธรรมเนียม' && (
            <Fee funds={selectedFundArray} generateDeleteFundUrl={generateDeleteFundUrl} />
        )}
        </div>
      </div>
    )
}

export default Detail;