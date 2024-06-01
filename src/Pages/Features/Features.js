import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/axios";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import Apiloader from "../../Components/Apiloader/Apiloader";
import Detailscard from "./Deatils/DetailsCard";

const Features = () => {
    let { type, id } = useParams();
    const axios = axiosInstance();
    const [isData, setIsData] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = () => {
        dispatch(ApiLoaderHandler(true));
            axios.get(`/${type === "Series" ? "tv" : "movie"}/${id}`)
            .then(res => {
                setIsData(res?.data);
                dispatch(ApiLoaderHandler(false));
            })
            .catch (err => {
            console.log(err?.response?.data);
            dispatch(ApiLoaderHandler(false));
            })
    };

    useEffect(() => {
        fetchData();
    }, [type, id ]);

    if (!isData) {
        return <Apiloader />;
    }

    const homeHandler = () =>{
        navigate('/')
    }

    return (
        <div className="h-full">
            <div className="h-full relative">
                <div
                    className="w-full h-full px-10 lg:px-[98px] absolute top-0 left-0"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(12, 12, 12, 1) 80%), url(https://image.tmdb.org/t/p/original/${isData.backdrop_path})`,
                        backgroundSize: 'cover', 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top',
                    }}
                >
                    <button className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex-col items-center text-bold text-white w-16 h-16 rounded-full bg-rose-700 bg-opacity-70 text-white flex justify-center items-center  ">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="32" width="32">
                                <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                            </svg>
                    </button>
                    <button className="absolute top-24 gap-1 items-center text-bold text-white w-16 h-16 text-white flex justify-center items-center font-medium text-lg " onClick={homeHandler}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                            </svg>
                            Back
                    </button>
                    <Detailscard isData={isData} type={type}/>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Features;
