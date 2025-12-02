import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    //lo siguiente se ejecuta una sola vez al cargar la app
    //Esto evita que el usuario se desloguee al refrescar la pagina

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser ){
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try{
            const res = await loginUser(credentials);

            localStorage.setItem("token",res.token);
            localStorage.setItem("user",JSON.stringify(res.user));

            setToken(res.token);
            setUser(res.user);
        }catch(error){
            console.error("Error en login context: ", error);
            throw error; // reenviamos el error al componente
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider 
        value={{ user, token, login, logout, isAuth: !!token }} >
            {loading ? <div>Cargando...</div> : children}
        </AuthContext.Provider>
    );

}