import { useUsers } from "../hooks/useUsers";

export default function Users(){
    const { users } = useUsers();

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
                            </tr>
                        ))}
                    </tbody>
               </table>     
                
            )}
        </div>
    );
}