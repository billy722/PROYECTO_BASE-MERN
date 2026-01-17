import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }){
    const { isAuth, loading } = useAuth();

    // let valorLoading = loading? true : false;
    // console.log("el valor de loading es: "+loading+" y valor: "+valorLoading);

    if(loading) return <p>Cargando...</p>

    if(!isAuth){
        return <Navigate to="/login" />
    }

    //si esta autenticado deja pasar el childre
    return children;
}
