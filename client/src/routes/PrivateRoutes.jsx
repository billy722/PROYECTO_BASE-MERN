import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { ALERT_TYPES } from "../constants/alertTypes";

export default function PrivateRoute({ roles }){
    const { isAuth, loading, user } = useAuth();
    const { showAlert } = useAlert();


    if(loading) return <p>Cargando...</p>

    if(!isAuth){
        return <Navigate to="/login" /> 
        showAlert("Sesión expirada", ALERT_TYPES.WARNING);
    }

    if(roles && !roles.includes(user.role)){
        showAlert("No tienes permisos para acceder a esta sección", ALERT_TYPES.WARNING);
        return <Navigate to="/home" />
    }

    return <Outlet />; 
    
}
