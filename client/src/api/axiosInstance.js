import axios from 'axios';
import { authEvents } from '../context/authEvents';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

console.log("API URL:", import.meta.env.VITE_API_URL);

//INTERCEPTOR DE REQUEST
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//INTERCEPTOR DE RESPONSE DE ESTADO 401(NO AUTORIZADO)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401){
            //token invalido o expirado
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            //redirigir al login
            window.location.href = "/login";

            authEvents.onLogout?.();
        }
        return Promise.reject(error);
    }
);

export default api;