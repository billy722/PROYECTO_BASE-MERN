import { useUsers } from "../hooks/useUsers";
import { useModal } from "../hooks/useModal";
import { MODAL_TYPES } from "../constants/modalTypes";

export default function Users(){
    const { users, removeUser } = useUsers();
    const { show } = useModal();

    const handleDelete = (user) => {
        // alert("funciona "+user.name);

        show({
            type: MODAL_TYPES.DANGER,
            title: "Desea eliminar?",
            message: "Esta seguro que desea eliminar este usuario?",
            onConfirm: () => removeUser(user._id)
        });
    };

    return(
        <div className="page">
            <h1>Usuarios</h1>

            {users.length === 0 ? (
                    <p>No hay usuarios.</p>
                ) : (
               <table className="table">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Email</th>
                            <th>RUT</th>
                            <th>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email || "-"}</td>
                                <td>{user.rut || "-"}</td>
                                <td>{user.role}</td>
                                <td><button onClick={() => handleDelete(user)}>X</button></td>
                            </tr>
                        ))}
                    </tbody>
               </table>     
                
            )}
        </div>
    );
}