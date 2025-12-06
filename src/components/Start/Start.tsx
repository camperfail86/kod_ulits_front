import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="start_wrapper">
      <div className="screen">
        <button className="start_button" onClick={()=>navigate("/login")}>Начать</button>
      </div>
    </div>
  );
};

export default Start;