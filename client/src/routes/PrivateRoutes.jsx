import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute(){
    const { isAuth, loading } = useAuth();


    if(loading) return <p>Cargando...</p>


    return isAuth ? <Outlet /> : <Navigate to="/login" />;
    
}
