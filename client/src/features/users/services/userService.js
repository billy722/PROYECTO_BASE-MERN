import api from "../../../api/axiosInstance";

export const getMe = async () => {
    const res = await api.get("/auth/me");
    return res.data;
}

export const getUsers = () => api.get("/users");

export const createUser = (data) => api.post("/users", data);

export const updateUser = (id, data) => api.put(`/users/${id}`, data);

export const deleteUser = (id) => api.delete(`/users/${id}`);