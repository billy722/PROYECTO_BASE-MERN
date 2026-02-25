import { useUsers } from "../hooks/useUsers";
import { useModal } from "../../../hooks/useModal";
import { MODAL_TYPES } from "../../../constants/modalTypes";
import UsersTable from "../components/usersTable";
import UserFormModal from "../components/UserForm";
import { useNavigate } from "react-router-dom";
export default function Users(){
    const { users, removeUser, addUser, editUser } = useUsers();
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

    // abre modal con formulario para crear usuario
    const handleCreate = () => {
        show({
            type: MODAL_TYPES.INFO,
            title: "Crear usuario",
            message: "",
            onConfirm: null,
            content: (
                <UserFormModal onSubmit={handleAddUser} />
            )
        });
        // navigate("/register");
    };
    //abre modal para editar usuario 
    const handleEdit = (user) => {
        show({
            type: MODAL_TYPES.INFO,
            title: "Editar usuario",
            message:"",
            onConfirm: null,
            content: (
                <UserFormModal 
                    onSubmit={(data) => handleEditUser(user._id, data)} 
                    initialData={user} 
                    isEdit
                />
            )
        });
    };

    const handleAddUser = async (data) => {
        try {
          await addUser(data);
          close();
        } catch (error) {
          console.error("Error recibido en el cliente", error);
          throw error; //paso el error al formulario
        }
      };

    const handleEditUser = async (id, data) => {
        try{
            await editUser(id, data);
            close();
        }catch (error){
            console.error("Error recibido en el cliente:", error);
            throw error; //paso el error al formulario
        }
    }


    return (
        <div className="page">
            <h1>Usuarios</h1>

            <button 
                className="btn btn-primary" 
                onClick={handleCreate}    
            >+ Crear usuario</button>
            <UsersTable users={users} onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
    );
}