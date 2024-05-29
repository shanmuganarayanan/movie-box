import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ApiLoaderHandler } from "../../actions/apiLoaderActions";
import { useNavigate } from "react-router-dom";


const Notfound = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(ApiLoaderHandler(false));
        navigate('/home');
    },[])
}

export default Notfound;