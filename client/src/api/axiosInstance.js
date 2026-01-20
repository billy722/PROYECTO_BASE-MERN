import axios from 'axios';
import { authEvents } from '../context/authEvents';
import { uiEvents } from '../context/UiEvents';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

console.log("API URL:", import.meta.env.VITE_API_URL);

//INTERCEPTOR DE REQUEST
api.interceptors.request.use(
    (config) => {
        uiEvents.showLoader?.();

        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        uiEvents.hideLoader?.();
        return Promise.reject(error);
    }
);

//INTERCEPTOR DE RESPONSE DE ESTADO 401(NO AUTORIZADO)
api.interceptors.response.use(
    (response) => {
        uiEvents.hideLoader?.();
        return response;
    },
    (error) => {

        uiEvents.hideLoader?.();

        if(error.response){

            if (error.response.status === 401){
    
                uiEvents.showAlert("Sesión expirada", "error");
    
                //token invalido o expirado
                localStorage.removeItem("token");
                localStorage.removeItem("user");
    
                //redirigir al login
                window.location.href = "/login";
    
                authEvents.onLogout?.();
            }else{
                uiEvents.showAlert?.(error.response.data?.msg || "Error del servidor", "error");
            }

        }else{
            uiEvents.showAlert?.("Error de conexión", "error");
        }

        return Promise.reject(error);
    }
);

export default api;