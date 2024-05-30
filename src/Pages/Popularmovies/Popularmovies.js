import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { axiosInstance } from "../../Axios/axios";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Popularmovies = () => {
    const [isAllData, steIsAllData] = useState(null);
    const [isSortedData,setIsSortedData] = useState(null);
    const [genres, setGenres] = useState([]);

    const axios = axiosInstance();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1920px)' });
    const isMediumcreen = useMediaQuery({ query: '(min-width: 1024px) and (max-width : 1280px' });

    const fetchAllMovies = () => {
        dispatch(ApiLoaderHandler(true));
        axios.get('/movie/popular')
            .then(res => {
                console.log(res?.data?.results);
                const sortedData = res?.data?.results.sort((a, b) => b.vote_average - a.vote_average);
                steIsAllData(sortedData);
                dispatch(ApiLoaderHandler(false));
            })
            .catch(err => {
                console.error(err?.data);
                dispatch(ApiLoaderHandler(false));
            })
    }

    const fetchGenerData = () => {
        dispatch(ApiLoaderHandler(true));
        axios.get('/genre/movie/list')
            .then(moviesGenreRes => {
                setGenres(moviesGenreRes?.data?.genres);
                dispatch(ApiLoaderHandler(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(ApiLoaderHandler(false));
            });
    };

    useEffect(() => {
        fetchAllMovies();
        fetchGenerData();
    }, [])

    useEffect(() => {
        if(isAllData){
            if(isLargeScreen){
                setIsSortedData(isAllData.slice(0, 20));
            }
            else if(isMediumcreen){
                setIsSortedData(isAllData.slice(0, 18));
            }
            else {
                setIsSortedData(isAllData.slice(0, 16));
            }
        }
    },[isAllData,isLargeScreen,isMediumcreen])

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
        navigate(`/Movie/${arr?.id}`);
    };

    return (
        <div className="bg-[#0C0C0C]">
            <div className="app-padding py-16">
                <p className="text-4xl font-bold text-center mt-10 text-white">Popular movies</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-5 gap-4 md:gap-8 lg:gap-12.5 place-items-center mt-11">
                    {isSortedData?.map((e, i) => (
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
                                {e?.title?.length < 40 ? 
                                    <p className="w-40 xl:w-60 text-lg font-bold truncate">{e.title}</p>
                                    :
                                    <p className="text-lg font-bold">{e.title}</p>
                                }
                            </div>
                            <div className="">
                                <p className="w-40 xl:w-60 font-medium truncate text-[#7C7C7C]">
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
            </div>
            <Footer />
        </div>
    )
}

export default Popularmovies;
