import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/axios";
import Footer from "../../Components/Footer/Footer";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import Apiloader from "../../Components/Apiloader/Apiloader";

const Profile = () => {

    let {id } = useParams();

    const axios = axiosInstance();

    const [isProdileData,setIsProfileData] = useState(null);

    const dispatch = useDispatch();

    const fetchData = () => {
        dispatch(ApiLoaderHandler(true));
         axios.get(`/person/${id}`)
         .then(res => {
             console.log(res?.data);
             setIsProfileData(res.data);
             dispatch(ApiLoaderHandler(false));
         })
        .catch (err => {
            console.log(err.response?.data);
            dispatch(ApiLoaderHandler(false));
        })
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (!isProdileData) {
        return <Apiloader />;
    }

    const truncateBiography = (biography) => {
        const words = biography.split(' ');
        if (words.length > 200) {
            return words.slice(0, 200).join(' ') + '...';
        }
        return biography;
    };

    const viewsiteHandler = () => {
        const homepageUrl = isProdileData?.homepage;
        if (homepageUrl) {
            window.open(homepageUrl, '_blank');
        }
    }

    console.log(id);

    return(
        <div className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 app-padding py-[120px] lg:py-16 lg:h-full gap-10">
                <div className="w-full flex lg:justify-center lg:items-center">
                    <img src={`https://image.tmdb.org/t/p/w300${isProdileData?.profile_path}`} className="h-[420px] w-[360px] object-cover object-center rounded-md"/>
                </div>
                <div className="w-full flex justify-center flex-col gap-5">
                   <p className="text-white text-3xl md:text-5xl font-bold banner-title">{isProdileData?.name}</p>
                   <p className="text-xs md:text-sm w-full lg:w-3/4 font-medium text-white text-left">{truncateBiography(isProdileData?.biography)}</p>
                   <button onClick={viewsiteHandler} className="w-fit px-4 py-2 bg-rose-700 flex items-center text-xs md:text-sm leading-6 text-white font-bold gap-2 rounded-md ">View more</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;