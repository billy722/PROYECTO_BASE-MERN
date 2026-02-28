
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";
import { ALERT_TYPES } from "../constants/alertTypes";
import "./Login.css";

export default function Login(){
    const { login } = useAuth();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isEmail = (value) => value.includes("@");

    const isValidRutFormat = (value) =>
      /^[0-9kK.\-]+$/.test(value);

    const handleSubmit = async (e) => {
        // showLoader();
        e.preventDefault(); // evita que la página se recargue
        setError(""); //limpiar error previo

        try{

            if (!identifier){
                setError("Ingrese email o Rut");
                return;
            }
           
            if (!isEmail(identifier) && !isValidRutFormat(identifier)){
                setError("Formato de rut inválido");
                return;
            }

            if (!password){
                setError("Ingrese contraseña");
                return;
            }

            await login({identifier, password});

           
            showAlert("Bienvenido", ALERT_TYPES.SUCCESS);

            navigate("/home");

        }catch (err){
            console.log("ERROR COMPLETO: ",err);
            setError(err.response?.data?.msg || "Error al iniciar sesión");
        }

    };

    //TODO LO QUE ESTA AQUI SE SIBUJA EN PANTALLA Y DEPENDE DEL ESTADO
    return (

        <div className="login-container">

            <div className="login-form-container">

                <img className="logo" src="../public/vite.svg" alt="" />
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Email o RUT"
                        value={identifier}
                        onChange= { (e) => setIdentifier(e.target.value)}
                    />

                    <br/>

                    <input 
                    className="input"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange= {(e) => setPassword(e.target.value)}
                    />

                    <br/>

                    <button className="btn btn-outline text-light bg-primary" type="submit">Enviar</button>

                </form>

                {error && <p className={"text-danger"}>{error}</p>}

            </div>


        </div>
    );
}