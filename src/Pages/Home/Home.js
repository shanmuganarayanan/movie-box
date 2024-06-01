import React, { useEffect, useState } from "react";
import Herobanner from "./Herobanner/Herobanner";
import Popular from "../../Components/Popular/Popular";
import Peoples from "./Peoples/Peoples";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';

const Home = () => {
    const {Nowplaying, Popularpeoples } = useSelector(state => state?.Moviedata);
    const [isViewAllPeoples,setIsViewAllPeoples] = useState(false);
    const [isPeopleAllData,setIsPeopleAllData] = useState(null);
    const isPeopleData  = Popularpeoples;

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1920px)' });
    const isMediumcreen = useMediaQuery({ query: '(min-width: 1024px) and (max-width : 1280px' });


    useEffect(() => {
        if (isPeopleData && !isViewAllPeoples) {
            if(isLargeScreen) {
                setIsPeopleAllData(isPeopleData.slice(0, 5));
            }
            else if(isMediumcreen){
                setIsPeopleAllData(isPeopleData.slice(0, 3));
            }
            else {
                setIsPeopleAllData(isPeopleData.slice(0, 4));
            }
        } else if (isPeopleData && isViewAllPeoples) {
            if(isLargeScreen) {
                setIsPeopleAllData(isPeopleData.slice(0, 20));
            }
            else if(isMediumcreen){
                setIsPeopleAllData(isPeopleData.slice(0, 18));
            }
            else {
                setIsPeopleAllData(isPeopleData.slice(0, 16));
            }
        }
    }, [isViewAllPeoples, isPeopleData, isLargeScreen, isMediumcreen]);





    return (
        <div className="h-full">
            <Herobanner data={Nowplaying}/>
            <Popular />
            <Peoples isPeopleAllData={isPeopleAllData} isViewAllPeoples={isViewAllPeoples} setIsViewAllPeoples={setIsViewAllPeoples} />
            <Footer />
        </div>
    );
}

export default Home;
