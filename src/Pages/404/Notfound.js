import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import { useNavigate } from "react-router-dom";


const Notfound = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(ApiLoaderHandler(false));
        navigate('/');
    },[])


    console.log("123");

    return(
        <div className="h-full w-full flex items-center text-center justify-center">
            <div className="max-w-lg w-full">
                <p className="text-9xl text-rose-700">404</p>
                <p className="mt-3 text-2xl text-gray-100 font-medium">An error occurred. Please try again later.</p>
                <p className="mt-6 text-xl text-gray-500">We are unable to process your request right now. Please try again after sometime.</p>
            </div>
        </div>
    )
}

export default Notfound;