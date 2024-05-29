import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../Assets/logo.png"
import Icon from "../Icons/Icons";

const Navbar = () => {

    const [isShowMenu,setIsShowMenu] = useState(false);

    const navigate = useNavigate();

    const homeHandler = () => {
        navigate('/')
    }

    const popularMoviesHandler = () => {
        navigate('/movies')
        setIsShowMenu(false);
    }

    return(
        <>
            <div className="fixed z-20 top-0 flex justify-between items-center h-16 sm:h-20 w-full px-4 sm:px-6 md:px-12 lg:px-[98px] bg-black bg-opacity-20">
                <div className="flex gap-4 sm:gap-5 md:gap-7 items-center">
                    <img src={Logo} alt="Logo" className="h-8 sm:h-10 md:h-12 cursor-pointer" onClick={homeHandler}/>
                </div>
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-rose-700 cursor-pointer flex items-center justify-center" onClick={() => setIsShowMenu(true)}>
                    <Icon name={"Menu"}/>
                </div>
            </div>
            {isShowMenu && 
            <div className="bg-black bg-opacity-95 z-20 fixed h-full w-full px-4 sm:px-6 md:px-12 lg:px-[98px] py-6">
                <div className="w-full flex justify-end">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-rose-700 cursor-pointer flex items-center justify-center text-white" onClick={() => setIsShowMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="mt-5">
                    <div>
                        <p className="text-gray-400 font-medium text-lg">New & Popular</p>
                        <div className="flex flex-col gap-3 items-start mt-3">
                            <button className="text-5xl font-bold text-white border-rose-700 hover:border-b hover:pb-1 w-full text-start hover:text-rose-700" onClick={popularMoviesHandler}>Movies</button>
                            <button className="text-5xl font-bold text-white border-rose-700 hover:border-b hover:pb-1 w-full text-start hover:text-rose-700">Series</button>
                        </div>
                    </div>
                </div>
                <div className="mt-9">
                    <div>
                        <p className="text-gray-400 font-medium text-lg">New & Popular</p>
                        <div className="flex flex-col gap-3 items-start mt-3">
                            <button className="text-5xl font-bold text-white border-rose-700 hover:border-b hover:pb-1 w-full text-start hover:text-rose-700">Movies</button>
                            <button className="text-5xl font-bold text-white border-rose-700 hover:border-b hover:pb-1 w-full text-start hover:text-rose-700">Series</button>
                            <button className="text-5xl font-bold text-white border-rose-700 hover:border-b hover:pb-1 w-full text-start hover:text-rose-700">TV Shows</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Navbar;