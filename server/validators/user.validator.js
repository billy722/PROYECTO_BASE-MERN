// Estas validan cosas como:
// Campos requeridos
// Formato de RUT
// Email válido
// Password obligatorio

import { validateRut } from "../utils/rut.js";

export function validateUserInput(data){
    const {name, email, rut, password} = data;

    const errors = {};

    if (!name || name.trim() === "" ){
        errors.name = "El nombre es obligatorio.";
    }

    if(!password || password.trim() === ""){
        errors.password = "La contraseña es obligatoria.";
    }

    if(!email && !rut){
        errors.general = "Debe ingresar email o RUT";
    }

    if (rut){
        if (!validateRut(rut)) {
          errors.rut = "RUT inválido.";
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;

}