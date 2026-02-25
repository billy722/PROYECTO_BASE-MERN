import { useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { useAlert } from "../../../hooks/useAlert";
import { ALERT_TYPES } from "../../../constants/alertTypes";

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
        }catch(error){
            if(error.response?.data?.type !== "validation"){
                showAlert("Error al crear usuario.", ALERT_TYPES.ERROR)
            }
            throw error; //envio el error al componente que lo usa
        }
    };

    const editUser = async (id, data) => {
        try{
            await updateUser(id, data);
            showAlert("Usuario actualizado", ALERT_TYPES.SUCCESS);
            fetchUsers();
        }catch(error){
            throw error;//envio el error al componente que lo usa
        }
    };

    const removeUser = async (id) => {
        try{
            await deleteUser(id);
            showAlert("Usuario eliminado.", ALERT_TYPES.SUCCESS);
            fetchUsers();
        }catch(error){
            showAlert("Error al eliminar el usuario.", ALERT_TYPES.ERROR);
            throw error;
            //envio el error al componente que lo usa
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


