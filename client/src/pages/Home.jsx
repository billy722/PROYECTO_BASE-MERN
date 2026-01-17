import { useEffect, useState } from "react";
import { getMe } from "../api/userService";
import { useAuth } from "../hooks/useAuth";

export default function Home(){
    const { logout, user } = useAuth();
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUser = async () =>{
    //         try{
    //             const data = await getMe();
    //             setUser(data);
    //         }catch(err){
    //             console.error("Error al obtener el usuario", err)
    //         }
    //     };

    //     fetchUser();
    // }, []);


    return(
        <div>
            <h1>Home</h1>
            {user ? (<p>Bienvenido {user.name} {user.role}</p>) : (<p>Cargando usuario...</p>)

            }
            <button onClick={ logout }>CERRAR SESION</button>
        </div>
        
    );

}