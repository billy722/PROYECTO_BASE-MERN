
import { useState } from "react";
import { loginUser } from "../api/authService";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // evita que la página se recargue
        setError(""); //limpiar error previo

        try{
            //llama la funcion Login de authService
            const data = await loginUser({ email, password });

            // guardar token
            localStorage.setItem("token", data.token);

            //guardar usuario
            localStorage.setItem("user", JSON.stringify(data.user));

            //redirigir
            window.location.href = "/home"
        }catch (err){
            console.log("ERROR COMPLETO: ",err);
            setError(err.response?.data?.msg || "Error al iniciar sesión")
        }

    };

    //TODO LO QUE ESTA AQUI SE SIBUJA EN PANTALLA Y DEPENDE DEL ESTADO
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange= { (e) => setEmail(e.target.value)}
                />

                <br/>

                <input 
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange= {(e) => setPassword(e.target.value)}
                />

                <br/>

                <button type="submit">Enviar</button>

            </form>

            {error && <p style={{ color:"red"}}>{error}</p>}
            {email && <p>{email}</p>}
        </div>
    );
}