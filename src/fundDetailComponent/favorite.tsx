import { Star } from "lucide-react";
import { useState } from "react";

const Favorite = () => {
    const [showFavorite,setShowFavorite] = useState<boolean>(false);

    return(
        <button className={`flex px-4 py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium shadow-md `} 
            onClick={() => setShowFavorite(!showFavorite)}
            style={{ whiteSpace: 'nowrap' }}
        >
            <Star 
                size={20} 
                fill={showFavorite ? "#ffea00" : "white"} 
                className={`${showFavorite ? "text-[#faea00]" : "text-white"} sm:h-[18px] sm:w-[18px] md:h-[19px] md:w-[19px] lg:h-[20px] lg:w-[20px] mt-[2px] mr-2 transition-colors duration-300 ease-in-out`}
            />
            ติดตาม
        </button>
    );
}

export default Favorite;