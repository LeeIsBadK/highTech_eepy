import { Star } from "lucide-react";
import { useState } from "react";

const Favorite = () => {
    const [showFavorite,setShowFavorite] = useState<boolean>(false);

    return(
        <button className={`flex px-4 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-medium shadow-md transition duration-250 ease-in-out delay-75 hover:-translate-y-[0px] hover:scale-110`} 
            onClick={() => setShowFavorite(!showFavorite)}
            style={{ whiteSpace: 'nowrap' }}
        >   
                <Star 
                    size={20} 
                    fill={showFavorite ? "#ffea00" : "white"} 
                    className={`${showFavorite ? "text-[#faea00]" : "text-white"} 2xl:w-[20px] 2xl:h-[20px] xl:w-[18px] xl:h-[18px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] sm:w-[12px] sm:h-[12px] mt-[2px] mr-2 transition-colors duration-300 ease-in-out`}
                />
            ติดตาม
        </button>
    );
}

export default Favorite;