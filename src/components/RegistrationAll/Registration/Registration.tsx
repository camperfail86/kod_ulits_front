import React from 'react';
import "./style.css";
import {Link} from "react-router-dom";

const Registration = () => {
    return (
        <div className="registr_wrapper">
            <h2 className="registr_title">Кем вы являетесь?</h2>
            <Link to={"/registration-organizer"} type="button" className="registr_btn">
                Организатор
            </Link>
            <Link to={"/registration-player"} type="button" className="registr_btn">
                Игрок
            </Link>
        </div>
    );
};

export default Registration;