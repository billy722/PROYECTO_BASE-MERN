import "./userTable.css";

export default function UsersTable({users, onDelete, onEdit}){
    if (users.lenght === 0){
        return <p>No hay usuarios.</p>
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rut</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {users.map( (user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email || "-"}</td>
                        <td>{user.rut || "-"}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => onEdit(user)}>Editar</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => onDelete(user)}>Eliminar</button>
                        </td>
                    </tr>
                ) )}
            </tbody>
        </table>
    );
}