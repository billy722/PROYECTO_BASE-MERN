import { createContext, useState, useEffect } from "react";
import { loginUser } from "../api/authService";
import { authEvents } from "./authEvents";
import { getMe } from "../api/userService";


export const AuthContext = createContext();

const getTokenExpiration = (token) => {
    if (!token) return null;

    try{
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000; //convierte a ms
    }catch{
        return null;
    }
};

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    //lo siguiente se ejecuta una sola vez al cargar la app
    //Esto evita que el usuario se desloguee al refrescar la pagina

    // USE EFFECT QUE RESTAURA INICIO DE SESSION
    useEffect(() => {
        const restoreSession = async () => {
          const savedToken = localStorage.getItem("token");
      
          if (!savedToken) {
            setLoading(false);
            return;
          }
      
          try {
            autoLogout(savedToken);
      
            const userData = await getMe(); // 👈 VALIDACIÓN REAL
            setUser(userData);
            setToken(savedToken);
      
          } catch (error) {
            logout(); // token inválido o expirado
          } finally {
            setLoading(false);
          }
        };
      
        restoreSession();
      }, []);

    //USE EFFECT QUE REGISTRA UN EVENTO GLOBAL
    useEffect(() => {
        authEvents.onLogout = logout;

        return () => {
            authEvents.onLogout =null;
        };
        
    }, []);

    const login = async (credentials) => {
        try{
            const res = await loginUser(credentials);

            localStorage.setItem("token",res.token);
            localStorage.setItem("user",JSON.stringify(res.user));

            setToken(res.token);
            setUser(res.user);

            autoLogout(res.token);

        }catch(error){
            console.error("Error en login context: ", error);
            throw error; // reenviamos el error al componente
        }
    };

    const logout = () => {

        if(logoutTimer){
            clearTimeout(logoutTimer);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    let logoutTimer;

    const autoLogout = (token) => {
        const expirationTime = getTokenExpiration(token);
        if (!expirationTime) return;

        //calculo cuanto tiempo queda para expirar
        const timeLeft = expirationTime - Date.now();

        if (timeLeft <= 0){
            logout();
        }else{
            logoutTimer = setTimeout(() => {
                logout();
            }, timeLeft);
        }

    };

    return (
        <AuthContext.Provider 
        value={{ user, token, login, logout, isAuth: !!token, loading }} >
            {children}
        </AuthContext.Provider>
    );

}