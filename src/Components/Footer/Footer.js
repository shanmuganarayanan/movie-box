import React from "react";
import Icon from "../Icons/Icons";

const Footer = () => {

    const List = {
        name: ["Facebook", "Instagram", "Twitter", "Youtube"]
    };
    

    return(
        <div className="py-20 flex flex-col justify-center items-center gap-9">
            <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
            {List?.name.map((e,i) => 
                <p key={i}>
                    <Icon name={e}/>
                </p>
            )}
            </div>
            <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
                <p className="text-lg font-bold text-white">Conditions of Use</p>
                <p className="text-lg font-bold text-white">Privacy & Policy</p>
                <p className="text-lg font-bold text-white">Press Room</p>
            </div>
            <div>
                <p className="text-lg font-bold text-gray-400">© 2024 MovieBox</p>
            </div>
        </div>
    )
}

export default Footer;
