import React from "react";
import { ICON_MAP } from "../../Assets/Icons/Icons";

const Icon = ({ name, layoutClass, onClick}) => {

    const IconToRender = ICON_MAP[name];

    return <IconToRender className={layoutClass} onClick={onClick}/>;

};

export default Icon;