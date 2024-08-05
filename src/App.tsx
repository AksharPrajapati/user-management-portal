import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Body from "./components/Body";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import WorkSpaceDetail from "./components/Workspace/WorkSpaceDetail";
import EmployeeDetail from "./components/Employee/EmployeeDetail";

const ProtectedRoute: React.FC<{
  element: React.ReactElement;
}> = ({ element }) => {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.user);

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

const RedirectIfAuthenticated: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.user);

  if (user?.email) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/register/:id",
    element: <RedirectIfAuthenticated element={<Register />} />,
  },
  {
    path: "/login",
    element: <RedirectIfAuthenticated element={<Login />} />,
  },
  {
    path: "/",
    element: <ProtectedRoute element={<Body />} />,
  },
  {
    path: "/dashboard/:id",
    element: <ProtectedRoute element={<WorkSpaceDetail />} />,
  },
  {
    path: "/profile",
    element: <ProtectedRoute element={<Profile />} />,
  },
  {
    path: "/employee-detail/:id",
    element: <ProtectedRoute element={<EmployeeDetail />} />,
  },
  {
    path: "/unauthorized",
    element: <div>Unauthorized Access</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
