
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home(){
    const { logout } = useContext(AuthContext);
    return(
        <div>
            <h1>Home</h1>
            <button onClick={ logout }>CERRAR SESION</button>
        </div>
        
    );

}