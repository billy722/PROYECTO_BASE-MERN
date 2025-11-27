import api from './axiosInstance';

//registrar ususario
export const registerUser = async (data) => {
    const res = await api.post('/auth/register', data);
    return res.data;
};

//INICIAS SESION
export const loginUser = async (data) => {
    const res = await api.post('/auth/login', data);
    return res.data;
};