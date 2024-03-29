import { Star } from "lucide-react";
import { useState } from "react";

const Favorite = () => {
    const [showFavorite,setShowFavorite] = useState<boolean>(false);

    return(
        <button className={`flex px-3 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] font-medium shadow-md `} 
            onClick={() => setShowFavorite(!showFavorite)}
            style={{ whiteSpace: 'nowrap' }}
        >
            <Star 
                size={20} 
                fill={showFavorite ? "#ffea00" : "white"} 
                className={`${showFavorite ? "text-[#faea00]" : "text-white"} 2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] sm:w-[12px] sm:h-[12px] mt-[1px] mr-2 transition-colors duration-300 ease-in-out`}
            />
            กองทุนติดตาม
        </button>
    );
}

export default Favorite;