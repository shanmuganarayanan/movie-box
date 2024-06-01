import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Navbar from "../Components/Navbar/Navbar";
import Features from "../Pages/Features/Features";
import { useDispatch, useSelector } from "react-redux";
import Apiloader from "../Components/Apiloader/Apiloader";
import Profile from "../Pages/Profiles/Profiles";
import Notfound from "../Pages/404/Notfound";
import Popularmovies from "../Pages/Popularmovies/Popularmovies";
import { ApiLoaderHandler } from "../actions/apiLoaderActions";
import { axiosInstance } from "../Axios/axios";
import { MoviesDataHandler } from "../actions/moviesActions";

const Main = () => {

    const { isApiLoading } = useSelector(state => state?.Loading);
    const Prevstate = useSelector((state) => state.Moviedata);
    console.log(Prevstate);
    const axios = axiosInstance();
    const dispatch = useDispatch();

    const fetchData = () => {
        dispatch(ApiLoaderHandler(true));
    
        Promise.all([
            axios.get('/movie/now_playing'),
            axios.get('/person/popular'),
            axios.get('/genre/movie/list'),
            axios.get('/genre/tv/list'),
            axios.get('/movie/popular'),
            axios.get('/tv/popular')
        ]).then(([nowPlayingRes, popularPeopleRes, moviesGenreRes, seriesGenreRes, moviesRes, seriesRes]) => {
            const nowPlayingData = nowPlayingRes?.data?.results.slice(0, 4).concat(nowPlayingRes?.data?.results[8]);
            const popularPeopleData = popularPeopleRes?.data?.results.sort((a, b) => b.popularity - a.popularity);
            const movieGenres = moviesGenreRes?.data?.genres;
            const seriesGenres = seriesGenreRes?.data?.genres;
            const popularMoviesData = moviesRes?.data?.results.map(movie => ({ ...movie, type: "Movie" }));
            const popularSeriesData = seriesRes?.data?.results.map(series => ({ ...series, type: "Series" }));
    
            const combinedData = [...popularMoviesData, ...popularSeriesData];
    
            dispatch(MoviesDataHandler({
                ...Prevstate,
                Nowplaying: nowPlayingData,
                Popularpeoples: popularPeopleData,
                Genres: [...movieGenres, ...seriesGenres],
                Combaineddata: combinedData,
                Popularmovies: popularMoviesData,
                Popularseries: popularSeriesData,
                Moviesgenres: [...movieGenres]
            }));
    
            dispatch(ApiLoaderHandler(false));
        }).catch(err => {
            console.log(err);
            dispatch(ApiLoaderHandler(false));
        });
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }



    return (
        <>
            {isApiLoading && <Apiloader />}
            <div className="h-screen">
                    <Navbar />
                    <Routes>
                        <Route path="*" element={<Notfound />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/:type/:id" element={<Features />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/movies" element={<Popularmovies />} />
                    </Routes>
                    <button onClick={scrollToTop} className="h-6 w-6 md:h-10 md:w-10 rounded-full fixed bottom-4 right-4 bg-white hover:bg-rose-700 text-rose-700 hover:text-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-4 w-4 md:h-6 md:w-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </button>
            </div>
        </>
    );
}

export default Main;