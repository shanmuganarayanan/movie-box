import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../Axios/axios";
import Herobanner from "./Herobanner/Herobanner";
import Popular from "../../Components/Popular/Popular";
import Peoples from "./Peoples/Peoples";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";

const Home = () => {
    const [isNowPlayingData, setIsNowPlayingData] = useState(null);
    const [isViewAllPeoples,setIsViewAllPeoples] = useState(false);
    const [isPeopleAllData,setIsPeopleAllData] = useState(null);
    const [isPeopleData,setIsPeopleData] = useState(null);
    const axios = axiosInstance();
    const dispatch = useDispatch();

    const getNowPlayingDetails = () => {
        dispatch(ApiLoaderHandler(true));
        axios.get(`/movie/now_playing`)
            .then(res => {
                console.log(res?.data?.results);
                setIsNowPlayingData([...res?.data?.results.slice(0, 4), res?.data?.results[8]]);
                dispatch(ApiLoaderHandler(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(ApiLoaderHandler(false));
            });
    }

    

    const getPeoples = () => {
        dispatch(ApiLoaderHandler(true));
        axios.get(`/person/popular`)
            .then(res => {
                const sortedResults = res?.data?.results.sort((a, b) => b.popularity - a.popularity);
                setIsPeopleData(sortedResults);
                setIsPeopleAllData(sortedResults);
                dispatch(ApiLoaderHandler(false));
            })
            .catch(err => {
                console.log(err);
                dispatch(ApiLoaderHandler(false));
            });
    }
    

    useEffect(() => {
        getNowPlayingDetails();
        getPeoples();
    }, []);


    useEffect(() => {
        if (isPeopleData && !isViewAllPeoples) {
            setIsPeopleAllData(isPeopleData.slice(0, 4));
        } else if (isPeopleData && isViewAllPeoples) {
            setIsPeopleAllData(isPeopleData.slice(0, 15));
        }
    }, [isViewAllPeoples, isPeopleData]);

    console.log();


    return (
        <div className="h-full">
            <Herobanner data={isNowPlayingData}/>
            <Popular />
            <Peoples isPeopleAllData={isPeopleAllData} isViewAllPeoples={isViewAllPeoples} setIsViewAllPeoples={setIsViewAllPeoples}/>
            <Footer />
        </div>
    );
}

export default Home;
