import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import Icon from "../Icons/Icons";

const Popular = () => {

    const [genres, setGenres] = useState([]);
    const [isAllData, setIsAllData] = useState(null);
    const [isPopularData,setIsPoularData] = useState(null);
    const [isViewAllPopular,setIsViewAllPopular] = useState(false);

    const axios = axiosInstance();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const fetchPopularMoviesAndSeries = () => {
        dispatch(ApiLoaderHandler(true));
        Promise.all([
            axios.get('/movie/popular'),
            axios.get('/tv/popular')
        ])
            .then(([moviesRes, seriesRes]) => {

                const moviesData = moviesRes?.data?.results.map(movie => ({
                    ...movie,
                    type: "Movie"
                }));

                const seriesData = seriesRes?.data?.results.map(series => ({
                    ...series,
                    type: "Series"
                }));

                const combinedData = [...moviesData, ...seriesData];
                setIsAllData(combinedData);
                dispatch(ApiLoaderHandler(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(ApiLoaderHandler(false));
            });
    };

    const fetchGenerData = () => {
        dispatch(ApiLoaderHandler(true));
        Promise.all([
            axios.get('/genre/movie/list'),
            axios.get('/genre/tv/list')
        ])
        .then(([moviesGenreRes, seriesGenreRes]) => {
            const movieGenres = moviesGenreRes?.data?.genres;
            const tvGenres = seriesGenreRes?.data?.genres;
            const combinedData = [...movieGenres, ...tvGenres];
            setGenres(combinedData);
            dispatch(ApiLoaderHandler(false));
        })
        .catch(err => {
            console.log(err);
            dispatch(ApiLoaderHandler(false));
        });
    };

    useEffect(() => {
        fetchPopularMoviesAndSeries();
        fetchGenerData();
    }, []);

    
    useEffect(() => {
        if (isAllData && !isViewAllPopular) {
            const sortedData = [...isAllData].sort((a, b) => b.vote_average - a.vote_average);
            setIsPoularData(sortedData.slice(0, 4));
        }
        else if(isAllData && isViewAllPopular){
            const sortedData = [...isAllData].sort((a, b) => b.vote_average - a.vote_average);
            setIsPoularData(sortedData.slice(0, 15));
        }
    }, [isAllData,isViewAllPopular]);
    
    const getCurrentYear = () => new Date().getFullYear();

    const getYear = (dateString) => {
        if (dateString) {
            const date = new Date(dateString);
            return date.getFullYear();
        }
        return getCurrentYear();
    };

    const genreMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});

    const dataHandler = (arr) => {
        navigate(`/${arr?.type}/${arr?.id}`);
        window.location.reload();
      };

    return(
        <div className="app-padding py-16">
                <p className="text-4xl font-bold text-center text-white">Popular Movies & Series</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-12.5 place-items-center mt-11">
                    {isPopularData?.map((e, i) => (
                        <div key={i} className="relative border border-[#1D1D1D] hover:shadow-lg p-2 hover:bg-[#161616] cursor-pointer text-white group" onClick={() => dataHandler(e)}>
                            <div className="h-[250px] w-[170px] sm:h-[300px] sm:w-[200px] md:h-[370px] md:w-[250px] overflow-hidden relative">
                                <img 
                                    src={`https://image.tmdb.org/t/p/original${e?.backdrop_path}`} 
                                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110 group-hover:opacity-40" 
                                    alt={e?.name || e?.title}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-12 h-12 rounded-full bg-white text-rose-700 flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {e?.type === 'Series' && (
                                <div className="absolute top-4 left-4 px-2 py-1 text-gray-900 bg-white bg-opacity-50 rounded-xl text-xs font-bold">
                                    TV SERIES
                                </div>
                            )}
                            <div className="mt-3">
                                <p className="text-xs text-[#7C7C7C]">
                                    {e?.origin_country?.length > 0 
                                        ? e.origin_country.map((country, index) => (
                                            <span key={index}>
                                                {country === "US" ? "USA" : country}
                                                {index < e.origin_country.length - 1 ? ', ' : ''}
                                            </span>
                                        ))
                                        : "USA"}
                                    , {e?.first_air_date ? getYear(e.first_air_date) : 2024}
                                </p>
                            </div>
                            <div className="mt-3">
                                <p className="text-lg font-bold w-40 xl:w-60 truncate">{e?.title || e?.original_name}</p>
                            </div>
                            <div className="">
                                <p className="font-medium text-[#7C7C7C] w-40 xl:w-60 truncate">
                                    {e.genre_ids.map((genreId, index) => (
                                        <span key={genreId}>
                                            {genreMap[genreId]}
                                            {index < e.genre_ids.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <button
                        className="text-white bg-[#171717] hover:bg-rose-700 text-lg flex gap-1 items-center justify-center rounded-full px-4 py-2.5" 
                        onClick={() => setIsViewAllPopular(prev => !prev)}
                    >
                        {isViewAllPopular ? "View Less" : "View More"} 

                        {isViewAllPopular ? 
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

export default Popular;