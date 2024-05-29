import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../Components/Icons/Icons"

const Peoples = ({
    isPeopleAllData,
    isViewAllPeoples,
    setIsViewAllPeoples
}) => {

    const navigate = useNavigate();

    const ProfileHandler = (arr) => {
        navigate(`/profile/${arr?.id}`);
    }

    return(
        <div className="app-padding py-16">
                <p className="text-4xl font-bold text-center text-white">Popular People</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 md:gap-8 lg:gap-20 place-items-center mt-11">
                    {isPeopleAllData?.map((e, i) => (
                        <div key={i} className="relative border border-[#1D1D1D] hover:shadow-lg p-2 hover:bg-[#161616] cursor-pointer text-white" onClick={() =>ProfileHandler(e)}>
                            <div className="h-[250px] w-[170px] sm:h-[300px] sm:w-[200px] md:h-[370px] md:w-[250px] overflow-hidden">
                                <img 
                                    src={`https://image.tmdb.org/t/p/original${e?.profile_path}`} 
                                    className="h-full w-full object-cover object-center" 
                                    alt={e?.name || e?.title}
                                />
                            </div>
                            <div className="mt-3">
                                <p className="text-lg font-bold">{e?.title || e?.original_name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-center">
                    <button
                        className="text-white bg-[#171717] hover:bg-rose-700 text-lg flex gap-1 items-center justify-center rounded-full px-4 py-2.5" 
                        onClick={() => setIsViewAllPeoples(prev => !prev)}
                    >
                        {isViewAllPeoples ? "View Less" : "View More"} 

                        {isViewAllPeoples ? 
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33335 10L8.00002 5.33333L12.6667 10" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            :                    
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6666 6L7.99998 10.6667L3.33331 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        }
                    </button>
                </div>
         </div>
    )
}

export default Peoples;