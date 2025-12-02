import { useEffect, useState } from "react";
import { registerUser } from "../api/authService";


export default function Register(){

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("vendedor");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setMensaje("");

        //Llama a la funcion register de authService
        const data = await registerUser({name,email,password,role});

        setMensaje(data.msg);

        try{

        }catch(err){
            console.log("Error completo", err);
            setMensaje(err.repsonse?.data?.msg || "Error al registrar usuario");
        }
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                
                <input 
                    type="text" 
                    placeholder="Ingrese nombre"
                    value={name}
                    onChange={ (e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Ingrese contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                </select>

                <button type="submit">REGISTRAR</button>

                {mensaje && <p>{mensaje}</p>}
            </form>
        </div>
    );

}