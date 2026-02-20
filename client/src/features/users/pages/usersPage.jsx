import { useUsers } from "../hooks/useUsers";
import { useModal } from "../../../hooks/useModal";
import { MODAL_TYPES } from "../../../constants/modalTypes";
import UsersTable from "../components/usersTable";
import UserFormModal from "../components/UserFormModal";
import { useNavigate } from "react-router-dom";
export default function Users(){
    const { users, removeUser, addUser } = useUsers();
    const { show, close } = useModal();
    const navigate = useNavigate();

    const handleDelete = (user) => {

        show({
            type: MODAL_TYPES.DANGER,
            title: "Desea eliminar?",
            message: "Esta seguro que desea eliminar este usuario?",
            onConfirm: () => removeUser(user._id)
        });
    };

    const handleCreate = () => {
        show({
            type: MODAL_TYPES.INFO,
            title: "Crear usuarios",
            message: "",
            onConfirm: null,
            content: (
                <UserFormModal onSubmit={handleAddUser} />
            )
        });
        // navigate("/register");
    };

    const handleAddUser = async (data) => {
        try {
          await addUser(data);
          close();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="page">
            <h1>Usuarios</h1>

            <button 
                className="btn" 
                onClick={handleCreate}    
            >+ Crear usuario</button>
            <UsersTable users={users} onDelete={handleDelete} />
        </div>
    );
}