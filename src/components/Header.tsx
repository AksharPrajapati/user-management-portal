import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state?.user?.authUser);
  const navigate = useNavigate();

  const handleSingOut = () => {
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4">
      <img
        alt="logo"
        className="w-24 h-24"
        src="https://t4.ftcdn.net/jpg/04/56/47/37/360_F_456473767_wzfsONIwl4umtupVWIRUNzkLnEmadbtc.jpg"
      />

      {user && (
        <div className="flex">
          <img
            alt="User Profile"
            className="w-24 h-24"
            src="https://t4.ftcdn.net/jpg/04/56/47/37/360_F_456473767_wzfsONIwl4umtupVWIRUNzkLnEmadbtc.jpg"
          />

          <button className="bg-gray-50 p-5 my-6" onClick={handleSingOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
