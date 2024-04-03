import { Scale } from "lucide-react";

interface CompareProps {
    fund: string;
  }

const Compare = ({fund}: CompareProps) => {
    const url = `/compare?selectedFund=${fund}`;
    return(
        <a href={url}>
            <button className={`flex px-4 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white text-[10px] md:text-[12px] lg:text-[14px] 2xl:text-[18px] font-medium shadow-md transition duration-250 ease-in-out delay-75 hover:-translate-y-[0px] hover:scale-110`} 
                style={{ whiteSpace: 'nowrap' }}
            >
                    <Scale 
                        size={20} 
                        className={`2xl:w-[20px] 2xl:h-[20px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[12px] h-[12px] mt-[1px] md:mt-[2px] mr-2 transition-colors duration-300 ease-in-out`}
                    />
                เปรียบเทียบ
            </button>
        </a>
    );
}

export default Compare;