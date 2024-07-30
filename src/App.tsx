import React from "react";
import Body from "./components/Body";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "./components/Register";
import Login from "./components/Login";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const location = useLocation();
  const { authUser } = useSelector((state: any) => state.user);
  if (!authUser) {
    // Redirect to "/" if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

const RedirectIfAuthenticated: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { authUser } = useSelector((state: any) => state.user);
  const location = useLocation();

  if (authUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/register",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
