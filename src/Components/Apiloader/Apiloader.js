import React from "react";
import Icon from "../Icons/Icons";

const Apiloader = () => {
  return (
    <div className="min-h-screen w-screen fixed z-50 bg-black bg-opacity-80 flex justify-center items-center">
      <Icon name={"Loader"} layoutClass={'w-20 h-20  text-gray-400 animate-spin dark:text-gray-400 fill-zinc-800'}/>
    </div>
  );
};

export default Apiloader;
