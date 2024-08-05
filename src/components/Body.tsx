import React from "react";
import Header from "./Header";
import Workspace from "../pages/Workspace";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import { useSelector } from "react-redux";

function Body() {
  const { user } = useSelector((state: any) => state.user);

  return (
    <div>
      <Header />
      {user?.role !== "employee" && <Workspace />}
      {user?.role === "employee" && <EmployeeDashboard />}
    </div>
  );
}

export default Body;
