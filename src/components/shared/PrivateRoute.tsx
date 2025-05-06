import { useAppSelector } from "@/redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ publicPage = false }) {
  const user = useAppSelector((state) => state.auth.user);

  if (publicPage) {
    return user ? <Navigate to="/profile" /> : <Outlet />;
  }

  return user ? <Outlet /> : <Navigate to="/profile" />;
}

export default PrivateRoute;
