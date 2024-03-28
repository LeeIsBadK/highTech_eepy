import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

interface CompareProps {
    fund: string;
  }

const Compare = ({fund}: CompareProps) => {
    const url = `/compare?selectedFund=${fund}`;
    return(
        <Link to={url}>
            <button className={`flex px-4 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium shadow-md transition duration-250 ease-in-out delay-75 hover:-translate-y-[0px] hover:scale-110`} 
                style={{ whiteSpace: 'nowrap' }}
            >
                    <Scale 
                        size={20} 
                        className={`sm:h-[18px] sm:w-[18px] md:h-[19px] md:w-[19px] lg:h-[20px] lg:w-[20px] mt-[2px] mr-2 transition-colors duration-300 ease-in-out`}
                    />
                เปรียบเทียบ
            </button>
        </Link>
    );
}

export default Compare;