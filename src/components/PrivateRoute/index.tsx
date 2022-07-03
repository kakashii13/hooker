import { Navigate } from "react-router-dom";
import { useHookerContext } from "../../context/HookerContext";
import { RouteProps } from "../../types";

export const PrivateRoute = ({ children }: RouteProps) => {
  const { currentUser } = useHookerContext();

  return currentUser !== null ? children : <Navigate to="/login" />;
};
