import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }){
    const { isAuth, loading } = useContext(AuthContext);

    if(loading) return <p>Cargando...</p>

    if(!isAuth){
        return <Navigate to="/login" />
    }

    //si esta autenticado deja pasar el childre
    return children;
}
