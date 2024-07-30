import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Body() {
  return (
    <div>
      <Header />
      Body
    </div>
  );
}

export default Body;
