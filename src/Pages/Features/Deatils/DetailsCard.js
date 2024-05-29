import React from "react";
import Icon from "../../../Components/Icons/Icons";

const Detailscard = ({
    type,
    isData,
}) => {

    const averageRating = isData.vote_average;
    const totalStars = 5;

    console.log(isData);

    return(
        <div className="h-full flex justify-center items-end w-full">
            <div className="xl:flex justify-center items-start w-full">
                <div className="xs:hidden md:hidden xl:block xl:w-1/4 flex xl:justify-center">
                    <div className="h-[250px] w-[170px] sm:h-[300px] sm:w-[200px] md:h-[370px] md:w-[250px] overflow-hidden">
                        <img src={`https://image.tmdb.org/t/p/original/${isData?.poster_path}`} className="rounded-md h-full w-full object-cover object-center" />
                    </div> 
                </div>
                <div className="w-full xl:w-3/4 lg:flex gap-10">
                    <div className="lg:w-2/4 ">
                        <p className="text-white text-3xl md:text-5xl font-bold banner-title">{isData?.name || isData?.original_name || isData?.title}</p>
                        {isData?.tagline ?
                            <p className="text-xl md:text-m w-full md:w-3/4 font-bold text-white mt-3">
                              {isData?.tagline}
                            </p> : ""
                        }
                        {isData?.created_by && (
                            <p className="text-sm md:text-m w-full md:w-3/4 font-bold text-white mt-3">
                                Directed by: {isData.created_by.length > 0 ? isData.created_by.map(e => e.name).join(', ') : 'TMDB'}
                            </p>
                        )}
                        <p className="text-xs md:text-sm w-full md:w-3/4 font-medium text-white mt-3 hidden lg:block">
                            {isData.overview.length > 300
                            ? `${isData.overview.slice(0, 300)}...`
                            : isData.overview}
                        </p>
                        <p className="text-sm md:text-m w-full md:w-3/4 font-bold text-white mt-3">Genre
                            <p className="flex gap-3 mt-3">
                                {isData?.genres.map((e,i) => (<p key={i} className="bg-gray-100 bg-opacity-20 rounded-md px-2 py-1 font-normal">{e?.name}</p>))} 
                            </p>
                        </p>
                        <div className="mt-5 flex gap-2.5 w-full">
                            <button className='px-4 py-2 border border-white flex items-center text-xs md:text-sm leading-6 text-white font-bold gap-2 rounded-md'>
                                <Icon name={'Plus'} />
                                Add to Watchlist
                            </button>
                        </div>

                    </div>
                    <div className="mt-3 :mt-0 lg:w-2/4 flex flex-col xl:gap-12 gap-5">
                        <div>
                            <p className="text-xl font-bold text-white">Ratings</p>
                            <div className="mt-3">
                                <p className="text-md text-white">Average Rating: {averageRating}</p>
                                <div className="flex items-center mt-1">
                                <div className="flex">
                                    {[...Array(totalStars)].map((_, index) => (
                                    <svg key={index} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={index < Math.floor(averageRating / 2) ? '#be123c' : 'gray'} className="h-5 w-5 text-yellow-500">
                                        <path fillRule="evenodd" d="M10 1l2.244 4.546 5.023.732-3.633 3.545.86 5.012-4.494-2.36-4.494 2.36.86-5.012-3.634-3.545 5.024-.732L10 1z" clipRule="evenodd"/>
                                    </svg>
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-white">{isData.vote_count} votes</p>
                                </div>
                            </div>
                        </div>
                        {type === "Series" && 
                            <div>
                                <p className="text-xl font-bold text-white">Seasons</p>
                                <div className="flex gap-4 mt-3">
                                    {isData?.seasons.slice(0, 4).map((e,i) => (
                                        <div key={i} className="w-20 h-24">
                                            <img src={`https://image.tmdb.org/t/p/original/${e?.poster_path || isData?.backdrop_path}`} alt={`Season ${e?.season_number}`} className="h-full w-full object-cover object-center rounded-md border-2 border-gray-400"/>
                                            <p className="text-xs md:text-sm w-full md:w-3/4 text-white">{e?.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detailscard;