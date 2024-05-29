import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Navbar from "../Components/Navbar/Navbar";
import Features from "../Pages/Features/Features";
import { useSelector } from "react-redux";
import Apiloader from "../Components/Apiloader/Apiloader";
import Profile from "../Pages/Profiles/Profiles";
import Notfound from "../Pages/404/Notfound";
import Popularmovies from "../Pages/Popularmovies/Popularmovies";

const Main = () => {

    const { isApiLoading } = useSelector(state => state?.Loading);

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
            </div>
        </>
    );
}

export default Main;