import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userService";
import { useAlert } from "./useAlert";
import { ALERT_TYPES } from "../constants/alertTypes";

export function useUsers(){
    const [users, setUsers] = useState([]);
    const { showAlert } = useAlert();

    const fetchUsers = async () => {
        try{
            const res = await getUsers();
            setUsers(res.data)
        }catch{
            showAlert("Error al cargar usuarios.", ALERT_TYPES.ERROR);
        }
    };

    const addUser = async (data) => {
        try{
            await createUser(data);
            showAlert("Usuario creado.", ALERT_TYPES.SUCCESS);
            fetchUsers();
        }catch{
            showAlert("Error al crear usuario.", ALERT_TYPES.ERROR)
        }
    };

    const editUser = async (id, data) => {
        try{
            await updateUser(id, data);
            showAlert("Usuario actualizado", ALERT_TYPES.SUCCESS);
            fetchUsers();
        }catch{
            showAlert("Error al editar el usuario.", ALERT_TYPES.ERROR)
        }
    };

    const removeUser = async (id) => {
        try{
            await deleteUser(id);
            showAlert("Usuario eliminado.", ALERT_TYPES.SUCCESS);
            fetchUsers();
        }catch{
            showAlert("Error al eliminar el usuario.", ALERT_TYPES.ERROR);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return{
        users,
        addUser,
        editUser,
        removeUser,
        refetch: fetchUsers
    };
}


