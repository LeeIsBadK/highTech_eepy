import { Star } from "lucide-react";

interface FavoriteProps {
    showFavorite: boolean;
  }
  
  const Favorite: React.FC<FavoriteProps> = ({ showFavorite }) => {
    return (
      <span
        className={`flex px-3 py-[6px] md:py-[7px] bg-gradient-to-tr from-[#00f2e1] to-[#1CA59B] hover:from-[#00e6d7] hover:to-[#118a82] rounded-[5px] text-white text-[9px] md:text-[10px] lg:text-[12px] 2xl:text-[16px] font-medium shadow-md `}
        style={{ whiteSpace: 'nowrap' }}
      >
        <Star
          size={20}
          fill={showFavorite ? '#ffea00' : 'white'}
          className={`${showFavorite ? 'text-[#faea00]' : 'text-white'} 2xl:w-[20px] 2xl:h-[20px] lg:w-[16px] lg:h-[16px] md:w-[14px] md:h-[14px] w-[12px] h-[12px] mr-2 transition-colors duration-300 ease-in-out`}
        />
        กองทุนติดตาม
      </span>
    );
  };
  
  export default Favorite;